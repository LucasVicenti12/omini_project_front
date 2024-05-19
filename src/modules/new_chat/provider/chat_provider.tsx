import { ReactNode, createContext, useState, useEffect, useMemo } from "react";
import { chatRepository } from "@/modules/new_chat/repository/chat_repository.ts";
import {
  decodeMessage,
  encodeMessage,
  Message,
  UserMessage,
} from "@/modules/new_chat/entities/message.ts";
import { Client } from "@stomp/stompjs";
import { baseURL } from "@/shared/api/baseURL";
import SockJS from "sockjs-client";

type ChatProviderProps = {
  receiptUserUUID: string;
  children: ReactNode;
};

type ChatContextState = {
  loading: boolean;
  chatSession: string;
  userMessage: UserMessage | null;
  messages: Message[];
  handleSendMessage: (message: Message) => void;
};

const ChatContextInitialState: ChatContextState = {
  loading: true,
  chatSession: "",
  userMessage: null,
  messages: [],
  handleSendMessage: () => {},
};

export const ChatContext = createContext(ChatContextInitialState);

var isBlurredWindow = false;
var numberMessages = 0;
var userTitleLogin = "";

export const ChatProvider = ({
  receiptUserUUID,
  children,
}: ChatProviderProps) => {
  const [properties, setProperties] = useState({
    loading: true,
    chatSession: "",
    userMessage: {},
  });
  const [messages, setMessages] = useState<Message[]>([]);

  const handleSetBlur = () => {
    isBlurredWindow = document.hidden
    if(!document.hidden){
      // @ts-ignore
      document.title = `My chat - ${userTitleLogin}`
    }
    numberMessages = 0;
  };

  useEffect(() => {    
    window.addEventListener("visibilitychange", handleSetBlur)

    return () => {
      window.removeEventListener("visibilitychange", handleSetBlur);
    }
  }, []);

  const connectWithWebSocket = (session: string) => {
    try {
      const stomp = new Client();

      // @ts-ignore
      stomp.webSocketFactory = () => {
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
        stomp.subscribe(`/topic/${session}`, handleReceiveMessage);
      };
      stomp.onStompError = (error: any) => {
        console.log(error);
      };
    } catch (e) {
      console.log(e);
    }
  };

  const handleReceiveMessage = (payload: any) => {
    var receiveMessage = JSON.parse(payload.body);
    if (receiveMessage) {
      setMessages((prev) => {
        if(isBlurredWindow){
          document.title = `My chat - ${userTitleLogin} (${numberMessages})`
        }

        let message = JSON.parse(payload.body);
        message.content = decodeMessage(message.content.toString());

        if (message.attachMessage) {
          message.attachMessage.content = decodeMessage(
            message.attachMessage.content.toString()
          );
        }

        message.whoSend = {
          // @ts-ignore
          isMe: message.sendUserUUID != receiptUserUUID,
          userName: ''
        }

        if (prev.map((i) => i.uuid).includes(message.uuid)) {
          return prev;
        }

        numberMessages++;
        return prev.concat(message);
      });
    }
  };

  useEffect(() => {
    chatRepository.connectChatSession(receiptUserUUID).then((response) => {
      if (response.error === null) {
        userTitleLogin = response.chatSession?.user?.login ?? '';
        document.title = `My chat - ${response.chatSession?.user?.login}`;

        chatRepository
          .getMessage(response.chatSession?.session!!)
          .then((responseMessages) => {
            if (responseMessages.error === null) {
              setMessages(
                responseMessages.messages.map((message: Message) => {
                  message.content = decodeMessage(message.content.toString());

                  if (message.attachMessage) {
                    message.attachMessage.content = decodeMessage(
                      message.attachMessage.content.toString()
                    );
                  }
                  return message;
                })
              );

              connectWithWebSocket(response.chatSession?.session!!);

              setProperties({
                loading: false,
                chatSession: response.chatSession?.session!!,
                userMessage: response.chatSession?.user!!,
              });
            }
          });
      }
    });
  }, [receiptUserUUID]);

  const handleSendMessage = (message: Message) => {
    if (message.content === null) {
      return;
    }

    message.content = encodeMessage(message.content);

    if (message.attachMessage) {
      // @ts-ignore
      message.attachMessage = { uuid: message.attachMessage.uuid };
    }

    chatRepository.sendMessageWithImage(message);
  };

  const value = {
    loading: properties.loading,
    chatSession: properties.chatSession,
    userMessage: properties.userMessage,
    messages,
    handleSendMessage,
  };

  //@ts-ignore
  return <ChatContext.Provider value={value}>{children}</ChatContext.Provider>;
};
