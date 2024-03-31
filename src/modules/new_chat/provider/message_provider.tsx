import {
  createContext,
  ReactNode,
  useContext,
  useEffect,
  useState,
} from "react";
import {
  ChatContext,
  Message,
} from "@/modules/new_chat/provider/chat_provider.tsx";
import { baseURL } from "@/shared/api/baseURL.ts";
import SockJS from "sockjs-client";
import { Client } from "@stomp/stompjs";
import { AuthContext } from "@/core/user/provider/auth_provider.tsx";
import {
  decodeMessage,
  encodeMessage,
  Message as NewMessage,
} from "../entities/message";

type MessageContextState = {
  messages: Message[];
  sendMessage: (message: string, attachedMessage: Message | null) => void;
  messageOut: (message: NewMessage) => void;
};

const messageContextInitialState: MessageContextState = {
  messages: [],
  sendMessage: () => {},
  messageOut: () => {},
};

export const MessageContext = createContext(messageContextInitialState);

type MessageContextProps = {
  children: ReactNode;
};

const stomp = new Client();
export const MessageProvider = ({ children }: MessageContextProps) => {
  const { user } = useContext(AuthContext);

  const { messagesFirstRequest, chatSession } = useContext(ChatContext);

  const [messages, setMessages] = useState<Message[]>([]);

  useEffect(() => {
    if (!chatSession && !messagesFirstRequest) return;
    setMessages(messagesFirstRequest);

    try {
      // @ts-ignore
      stomp.webSocketFactory = function () {
        const url = baseURL();
        let host = "";
        let protocol = "";

        if (url) {
          const newURL = new URL(url);
          host = `${newURL.hostname}:${newURL.port}`;
          protocol = "http";
        } else {
          host = new URL(document.location.href).hostname;
          protocol = "https";
        }
        return new SockJS(`${protocol}://${host}/ws`);
      };
      stomp.activate();
      stomp.onConnect = () => {
        stomp.subscribe(`/topic/${chatSession}`, onReceivedMessage);
      };
      stomp.onStompError = onSocketError;
    } catch (e) {}
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
    // @ts-ignore
    setMessages((prev) => prev.concat(JSON.parse(payload.body)));
  };

  const onSocketError = (error: any) => {
    console.log(error);
  };

  const handleSendMessage = (
    message: string,
    attachedMessage: Message | null
  ) => {
    if (message === "") return;
    stomp.publish({
      destination: "/app/chat_add_message",
      body: JSON.stringify({
        chatSessionUUID: chatSession,
        content: message,
        sendUserUUID: user.uuid,
        attachMessage: attachedMessage ? { uuid: attachedMessage.uuid } : null,
      }),
    });
  };

  const value = {
    messages,
    sendMessage: (message: string, attachedMessage: Message | null) => {
      handleSendMessage(message, attachedMessage);
    },
    messageOut: (message: NewMessage) => {
      

      let encoded = encodeMessage(message);

      console.log(encoded);

      let decoded = decodeMessage(encoded);

      console.log(decoded);
    },
  };

  return (
    <MessageContext.Provider value={value}>{children}</MessageContext.Provider>
  );
};
