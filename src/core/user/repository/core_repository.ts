import {LoginResponse} from "@/core/user/repository/response/login_response.ts";
import {http} from "@/shared/api/http_helper.ts";
import {RegisterResponse} from "@/core/user/repository/response/register_response.ts";

class CoreRepository {
    async login(username: string, password: string): Promise<LoginResponse> {
        try {
            const response = await http.post("/auth/login", {
                login: username,
                password: password
            })
            if (response.status === 200) {
                return {
                    token: response.data.token,
                    error: null
                }
            } else {
                return {
                    token: null,
                    error: "Invalid credentials"
                }
            }
        } catch (e) {
            return {
                token: null,
                error: "An unexpected error has occurred"
            }
        }
    }

    async register(login: string, password: string): Promise<RegisterResponse> {
        try {
            const response = await http.post("/auth/register", {
                login,
                password,
                userType: 'USER'
            });
            if (response.status === 200) {
                return {
                    login: response.data.login,
                    userType: response.data.userType,
                    error: null
                }
            } else {
                return {
                    login: null,
                    userType: null,
                    error: "Unable to register user"
                }
            }
        } catch (e) {
            return {
                login: null,
                userType: null,
                error: "An unexpected error has occurred"
            }
        }
    }

    async getAllUsers(): Promise<UsersListResponse> {
        try {
            const response = await http.get("/users/list");
            if (response.status === 200) {
                return {
                    users: response.data.users,
                    error: null
                }
            } else {
                return {
                    users: null,
                    error: "An unexpected error has occurred"
                }
            }
        } catch (e) {
            return {
                users: null,
                error: "An unexpected error has occurred"
            }
        }
    }
}

export const coreRepository = new CoreRepository()