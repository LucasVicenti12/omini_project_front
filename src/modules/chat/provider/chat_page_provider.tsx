import {createContext, ReactNode, useEffect, useState} from "react";
import {chatRepository} from "@/modules/chat/repository/chat_repository.ts";

type ChatPageContextState = {
    chatUUID: string | null,
    userMessage: any,
    messages: any[],
    sendMessage: (message: string) => void,
}

const initialState: ChatPageContextState = {
    chatUUID: null,
    userMessage: null,
    messages: [],
    sendMessage: () => {
    }
}

type ChatPageProviderProps = {
    chatUUID: string,
    children: ReactNode
}

export const ChatPageContext = createContext<ChatPageContextState>(initialState);

export const ChatPageProvider = ({chatUUID, children}: ChatPageProviderProps) => {
    const [userMessage, setUserMessage] = useState(null);

    const [messages, setMessages] = useState([]);

    useEffect(() => {
        chatRepository.getUserByUUID(chatUUID).then((response) => {
            if (response.error === null) {
                setUserMessage(response.user);
            }
        })
    }, [chatUUID]);

    const websocket = new WebSocket(`ws://localhost:9000/ws/${chatUUID}`)

    websocket.onmessage = (response) => {
        setMessages(prevState => prevState.concat(JSON.parse(response.data)))
    }

    const value = {
        chatUUID,
        userMessage,
        messages,
        sendMessage: (message: string) => {
            websocket.send(JSON.stringify({
                uuid: "sjdhsj",
                message,
                dateTimeMessage: null,
                userUUID: null
            }))
        }
    }

    console.log(messages)

    return (
        <ChatPageContext.Provider value={value}>
            {children}
        </ChatPageContext.Provider>
    );
}