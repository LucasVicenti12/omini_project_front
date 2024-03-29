import {createContext, ReactNode, useEffect, useState} from "react";
import {chatRepository} from "@/modules/chat/repository/chat_repository.ts";
import SockJS from 'sockjs-client';
import {Client} from "@stomp/stompjs";
import {baseURL} from "@/shared/api/baseURL.ts";

type ChatPageContextState = {
    userMessage: any,
    messages: any[],
    sendMessage: (message: string, attachedMessage: any) => void,
}

const initialState: ChatPageContextState = {
    userMessage: null,
    messages: [],
    sendMessage: () => {
    }
}

type ChatPageProviderProps = {
    sendUserUUID: string,
    receiptUserUUID: string,
    children: ReactNode
}

export const ChatPageContext = createContext<ChatPageContextState>(initialState);

const stomp = new Client()
export const ChatPageProvider = ({sendUserUUID, receiptUserUUID, children}: ChatPageProviderProps) => {
    const [userMessage, setUserMessage] = useState(null);

    const [messages, setMessages] = useState([]);

    const [
        chatSession,
        setChatSession
    ] = useState({session: "", situation: ""});

    useEffect(() => {
        chatRepository.getUserByUUID(receiptUserUUID).then((response) => {
            if (response.error === null) {
                setUserMessage(response.user);
            }
        })
        chatRepository.connectChatSession(sendUserUUID, receiptUserUUID).then((response) => {
            if (response.error === null) {
                setChatSession({
                    session: response.chatSession ?? "",
                    situation: response.situation ?? ""
                })
            }
        })
        stomp.deactivate()
    }, [receiptUserUUID]);

    useEffect(() => {
        if (chatSession.session !== '') {
            try {
                // @ts-ignore
                stomp.webSocketFactory = function () {
                    const test = baseURL();
                    let host = "";

                    if (test) {
                        const url = new URL(test);
                        host = `${url.hostname}:${url.port}`;
                    } else {
                        host = new URL(document.location.href).hostname;
                    }

                    return new SockJS(`https://${host}/ws`);
                }
                stomp.activate()
                stomp.onConnect = () => {
                    stomp.subscribe(`/topic/${chatSession.session}`, onReceivedMessage)
                }
                stomp.onStompError = onSocketError
            } catch (e) {
            }
            chatRepository
                .getMessage(chatSession.session)
                .then((response) => {
                    setMessages(response.messages);
                })
        }
    }, [chatSession]);

    const onReceivedMessage = (payload: any) => {
        let newMessage = JSON.parse(payload.body);
        if (!newMessage) {
            return;
        }
        // @ts-ignore
        if (messages.includes(newMessage)) {
            return;
        }
        setMessages(prev => prev.concat(JSON.parse(payload.body)))
    }

    const onSocketError = (error: any) => {
        console.log(error);
    }

    const handleSendMessage = (message: string, attachedMessage: any) => {
        if (message === '') return;
        stomp.publish({
            destination: "/app/chat_add_message",
            body: JSON.stringify({
                chatSessionUUID: chatSession.session,
                content: message,
                sendUserUUID: sendUserUUID,
                attachMessage: attachedMessage ? {uuid: attachedMessage.uuid} : null
            })
        })
    }

    const value = {
        userMessage,
        messages,
        sendMessage: (message: string, attachedMessage: any) => {
            handleSendMessage(message, attachedMessage)
        }
    }

    return (
        <ChatPageContext.Provider value={value}>
            {children}
        </ChatPageContext.Provider>
    );
}