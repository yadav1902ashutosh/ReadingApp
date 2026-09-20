import config from "./config";

export class AuthService {
    // Base URL loaded from env / config
    baseUrl = config.apiUrl || import.meta.env.VITE_API_BASE_URL;

    // Helper to get Authorization headers for mobile/cross-domain reliability
    getAuthHeaders(customHeaders = {}) {
        const token = localStorage.getItem("accessToken");
        const headers = { ...customHeaders };
        if (token) {
            headers["Authorization"] = `Bearer ${token}`;
        }
        return headers;
    }

    async createAccount({ fullName, email, username, password }) {
        try {
            const response = await fetch(`${this.baseUrl}/user/register`, {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                credentials: "include",
                body: JSON.stringify({ fullName, email, username, password }),
            });

            const data = await response.json();

            if (!response.ok) {
                throw new Error(data.message || "Registration failed");
            }

            return await this.login({
                email: email || username,
                password,
            });
        } catch (error) {
            console.error("AuthService :: createAccount :: error", error);
            throw error;
        }
    }

    async login({ email, username, password }) {
        try {
            const response = await fetch(`${this.baseUrl}/user/login`, {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                credentials: "include",
                body: JSON.stringify({ email, username, password }),
            });

            const data = await response.json();

            if (!response.ok) {
                throw new Error(data.message || "Invalid credentials");
            }

            // Save token to localStorage for Android Chrome & cross-domain support
            if (data.data?.accessToken) {
                localStorage.setItem("accessToken", data.data.accessToken);
            }

            return data.data.user;
        } catch (error) {
            console.error("AuthService :: login :: error", error);
            throw error;
        }
    }

    async getCurrentUser() {
        try {
            const headers = this.getAuthHeaders();
            const response = await fetch(`${this.baseUrl}/user/current-user`, {
                method: "GET",
                headers,
                credentials: "include",
            });

            if (!response.ok) {
                if (response.status === 401) {
                    localStorage.removeItem("accessToken");
                }
                return null;
            }

            const data = await response.json();
            return data.data;
        } catch (error) {
            console.error("AuthService :: getCurrentUser :: error", error);
            return null;
        }
    }

    async logout() {
        try {
            const headers = this.getAuthHeaders();
            const response = await fetch(`${this.baseUrl}/user/logout`, {
                method: "POST",
                headers,
                credentials: "include",
            });

            localStorage.removeItem("accessToken");

            if (!response.ok) {
                const data = await response.json();
                throw new Error(data.message || "Logout failed");
            }

            return true;
        } catch (error) {
            console.error("AuthService :: logout :: error", error);
            localStorage.removeItem("accessToken");
            throw error;
        }
    }
}

const authService = new AuthService();
export default authService;