import config from "./config";

export class AuthService{
    // Base URL loaded from your conf.js / environment variables
    baseUrl = config.apiUrl || import.meta.env.VITE_API_BASE_URL;

    async createAccount({fullName, email, username, password})
    {
        try {
            const response = await fetch(`${baseURL}/users/register`,{
                method: "POST",
                headers: {'Content-Type': 'application/json'},
                credentials: "include",
                body: JSON.stringify({ fullName, email, username, password }),
            })

            const user = response.json()

            if(!response)
            {
                throw new Error(data.message || "Registration Failed")
            }

            return await this.login({
                email: email||username,
                password
            });
        } catch (error) {
            console.error('AuthService :: createAccount :: error', error);
            throw error;
        }
    }

    async login({email, username, password})
    {
        try {
            const response = await fetch(`${BASE_URL}/users/login`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                credentials: 'include',
                body: JSON.stringify({ email, username, password }),
            })

            const data = response.json();

            if (!response.ok) {
                throw new Error(data.message || 'Invalid credentials');
            }

            // Return user object inside ApiResponse payload
            return data.data.user;
        } catch (error) {
            console.error('AuthService :: login :: error', error);
            throw error;
        }
    }

    // 3. Get Current User Session
    async getCurrentUser() {
        try {
            const response = await fetch(`${this.baseUrl}/users/current-user`, {
                method: 'GET',
                credentials: 'include',
            });

            if (!response.ok) return null;

            const data = await response.json();
            return data.data;
        } catch (error) {
            console.error('AuthService :: getCurrentUser :: error', error);
            return null;
        }
    }

    // 4. Logout User
    async logout() {
        try {
            const response = await fetch(`${this.baseUrl}/users/logout`, {
                method: 'POST',
                credentials: 'include',
            });

            if (!response.ok) {
                const data = await response.json();
                throw new Error(data.message || 'Logout failed');
            }

            return true;
        } catch (error) {
            console.error('AuthService :: logout :: error', error);
            throw error;
        }
    }
}   

const authService = new AuthService();
export default authService;