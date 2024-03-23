import {createContext, ReactNode, useState} from "react";

type ChatContextState = {
    attachedMessage: any,
    handleSetAttechMessage: (parameter: any) => void,
    handleRemoveAttach: () => void
}

const ChatContextInitialState: ChatContextState = {
    attachedMessage: null,
    handleSetAttechMessage: () => {
    },
    handleRemoveAttach: () => {
    }
}

export const ChatContext = createContext(ChatContextInitialState);

type ChatProviderProps = {
    children: ReactNode
}
export const ChatProvider = ({children}: ChatProviderProps) => {
    const [attachedMessage, setAttachedMessage] = useState(null);

    const handleSetAttechMessage = (newAttachMessage: any) => setAttachedMessage(newAttachMessage)

    const handleRemoveAttach = () => setAttachedMessage(null)

    const value = {
        attachedMessage,
        handleSetAttechMessage,
        handleRemoveAttach
    }

    return (
        <ChatContext.Provider value={value}>
            {children}
        </ChatContext.Provider>
    );
}