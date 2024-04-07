import {http} from "@/shared/api/http_helper.ts";
import { Message } from "../entities/message";

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

    async connectChatSession(sendUserUUID: string, receiptUserUUID: string): Promise<ChatSessionResponse> {
        try {
            const response = await http.get(
                `/chat_session/connect?sendUserUUID=${sendUserUUID}&receiptUserUUID=${receiptUserUUID}`
            )
            if (response.status === 200) {
                if (response.data !== null) {
                    return {
                        chatSession: response.data.chatSession.chatSession,
                        situation: response.data.situation,
                        error: null
                    }
                } else {
                    return {
                        chatSession: null,
                        situation: null,
                        error: "Lost connection"
                    }
                }
            } else {
                return {
                    chatSession: null,
                    situation: null,
                    error: "An unexpected error has occurred"
                }
            }
        } catch (e) {
            return {
                chatSession: null,
                situation: null,
                error: "An unexpected error has occurred"
            }
        }
    }

    async getMessage(chatSessionUUID: string): Promise<MessagesResponse> {
        try {
            const response = await http.get(`/messages?chatSessionUUID=${chatSessionUUID}`);
            if (response.status === 200) {
                if (response.data !== null) {
                    return {
                        messages: response.data,
                        error: null
                    }
                } else {
                    return {
                        messages: [],
                        error: "An unexpected error has occurred"
                    }
                }
            } else {
                return {
                    messages: [],
                    error: "An unexpected error has occurred"
                }
            }
        } catch (e) {
            return {
                messages: [],
                error: "An unexpected error has occurred"
            }
        }
    }

    async sendMessageWithImage(message: Message){
        try{
            await http.post("/messages/send_message_by_post", message)
        }catch(e){
            console.log(e);
        }
    }
}

export const chatRepository = new ChatRepository();