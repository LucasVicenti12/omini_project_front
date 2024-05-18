import {
  createContext,
  ReactNode,
  useContext,
  useEffect,
  useState,
} from "react";
import { ChatContext } from "@/modules/new_chat/provider/chat_provider.tsx";
import { baseURL } from "@/shared/api/baseURL.ts";
import SockJS from "sockjs-client";
import { Client } from "@stomp/stompjs";
import { decodeMessage, encodeMessage, Message } from "../entities/message";
import { chatRepository } from "../repository/chat_repository";

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
    setMessages((prev) => {
      let message = JSON.parse(payload.body);

      message.content = decodeMessage(message.content.toString());

      if(message.attachMessage){
        message.attachMessage.content = decodeMessage(message.attachMessage.content.toString());
        if(
          typeof message.attachMessage.content === 'object' &&
          message.attachMessage.content.hasOwnProperty('image')
        ){
          message.attachMessage.content = message.attachMessage.content?.text ?? '';
        }
      }

      if(prev.includes(message)){
        return prev;
      }

      return prev.concat(message);
    });
  };

  const onSocketError = (error: any) => {
    console.log(error);
  };

  const value = {
    messages,
    sendMessage: (message: Message) => {
      if (message.content === null) {
        return;
      }

      message.content = encodeMessage(message.content);

      if(message.attachMessage){
        if(
          typeof message.attachMessage.content === 'object' &&
          message.attachMessage.content.hasOwnProperty('image')
        ){
          message.attachMessage.attachMessage = null;
          message.attachMessage.content = encodeMessage(message.attachMessage.content.toString());
        }
      }

      chatRepository.sendMessageWithImage(message);
    },
  };

  return (
    <MessageContext.Provider value={value}>{children}</MessageContext.Provider>
  );
};
