import {ReactNode, createContext, useState, useEffect} from "react";
import {chatRepository} from "@/modules/chat/repository/chat_repository.ts";

type ChatProviderProps = {
    sendUserUUID: string;
    receiptUserUUID: string;
    children: ReactNode;
};

type UserMessage = {
    uuid: string
    login: string
    passwordUser: null,
    email: string,
    avatar: string,
    altAvatar: string,
    name: string,
    surname: string
}

export type Message = {
    content: string,
    sendMessageDateTime: string,
    uuid: string,
    attachMessage: Message | null,
    sendUserUUID: string
}

type ChatContextState = {
    loading: boolean,
    chatSession: string,
    userMessage: UserMessage | null,
    messagesFirstRequest: Message[] | [],
}

const ChatContextInitialState: ChatContextState = {
    loading: true,
    chatSession: "",
    userMessage: null,
    messagesFirstRequest: [],
}

export const ChatContext = createContext(ChatContextInitialState);

export const ChatProvider = ({receiptUserUUID, sendUserUUID, children}: ChatProviderProps) => {
    const [value, setValue] = useState({
        loading: true,
        chatSession: "",
        userMessage: null,
        messagesFirstRequest: [],
    });

    useEffect(() => {
        Promise.all([
            chatRepository.getUserByUUID(receiptUserUUID),
            chatRepository.connectChatSession(sendUserUUID, receiptUserUUID),
        ]).then((response) => {
            if (response[0].error === null) {
                if (response[1].error === null) {
                    let session = response[1].chatSession!;
                    chatRepository.getMessage(session).then((responseM) => {
                        if (responseM.error === null) {
                            setValue({
                                loading: false,
                                chatSession: session,
                                userMessage: response[0].user,
                                messagesFirstRequest: responseM.messages,
                            })
                        }
                    })
                }
            }
        })
    }, []);

    return (
        <ChatContext.Provider value={value}>
            {children}
        </ChatContext.Provider>
    );
}