import {http} from "@/shared/api/http_helper.ts";

class ChatRepository {
    async getUserByUUID(userUUID: string): Promise<UserResponse> {
        try {
            const response = await http.get(`/users/getUserByUUID/${userUUID}`)
            if (response.status === 200) {
                return {
                    user: response.data.user,
                    error: null
                }
            } else {
                return {
                    user: null,
                    error: "An unexpected error has occurred"
                }
            }
        } catch (e) {
            return {
                user: null,
                error: "An unexpected error has occurred"
            }
        }
    }
}

export const chatRepository = new ChatRepository();