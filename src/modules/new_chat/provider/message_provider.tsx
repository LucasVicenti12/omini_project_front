import {
  createContext,
  ReactNode,
  useContext,
  useEffect,
  useState,
} from "react";
import {
  ChatContext,
} from "@/modules/new_chat/provider/chat_provider.tsx";
import { baseURL } from "@/shared/api/baseURL.ts";
import SockJS from "sockjs-client";
import { Client } from "@stomp/stompjs";
import {
  decodeMessage,
  encodeMessage,
  Message,
} from "../entities/message";

type MessageContextState = {
  messages: Message[];
  sendMessage: (message: Message) => void;
};

const messageContextInitialState: MessageContextState = {
  messages: [],
  sendMessage: () => {},
};

export const MessageContext = createContext(messageContextInitialState);

type MessageContextProps = {
  children: ReactNode;
};

const stomp = new Client();
export const MessageProvider = ({ children }: MessageContextProps) => {
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
    setMessages((prev) => {
      let message = JSON.parse(payload.body);

      message.content = decodeMessage(message.content);

      if(message.attachMessage){
        message.attachMessage.content = decodeMessage(message.attachMessage.content.toString());
      }

      return prev.concat(message);
    });
  };

  const onSocketError = (error: any) => {
    console.log(error);
  };

  const handleSendMessage = (
    message: Message
  ) => {
    if (message.content === "") return;
    stomp.publish({
      destination: "/app/chat_add_message",
      body: JSON.stringify(message),
    });
  };

  const value = {
    messages,
    sendMessage: (message: Message) => {
      message.content = encodeMessage(message.content);
      handleSendMessage(message);
    },
  };

  return (
    <MessageContext.Provider value={value}>{children}</MessageContext.Provider>
  );
};
