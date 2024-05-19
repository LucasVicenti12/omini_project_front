import { UserMessage } from "../../entities/message"

export type ChatSessionResponse = {
    chatSession: ChatSession | null,
    situation: string | null,
    error: string | null
}

export type ChatSession = {
    session: string | null,
    user: UserMessage | null,
}