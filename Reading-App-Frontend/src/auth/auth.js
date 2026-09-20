import config from "./config";

export class AuthService {
    // Base URL loaded from env / config
    baseUrl = config.apiUrl || import.meta.env.VITE_API_BASE_URL;

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

            return data.data.user;
        } catch (error) {
            console.error("AuthService :: login :: error", error);
            throw error;
        }
    }

    async getCurrentUser() {
        try {
            const response = await fetch(`${this.baseUrl}/user/current-user`, {
                method: "GET",
                credentials: "include",
            });

            if (!response.ok) return null;

            const data = await response.json();
            return data.data;
        } catch (error) {
            console.error("AuthService :: getCurrentUser :: error", error);
            return null;
        }
    }

    async logout() {
        try {
            const response = await fetch(`${this.baseUrl}/user/logout`, {
                method: "POST",
                credentials: "include",
            });

            if (!response.ok) {
                const data = await response.json();
                throw new Error(data.message || "Logout failed");
            }

            return true;
        } catch (error) {
            console.error("AuthService :: logout :: error", error);
            throw error;
        }
    }
}

const authService = new AuthService();
export default authService;