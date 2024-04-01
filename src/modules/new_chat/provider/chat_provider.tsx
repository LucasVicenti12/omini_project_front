import { ReactNode, createContext, useState, useEffect } from "react";
import { chatRepository } from "@/modules/new_chat/repository/chat_repository.ts";
import {decodeMessage, Message} from "@/modules/new_chat/entities/message.ts";

type ChatProviderProps = {
  sendUserUUID: string;
  receiptUserUUID: string;
  children: ReactNode;
};

type UserMessage = {
  uuid: string;
  login: string;
  passwordUser: null;
  email: string;
  avatar: string;
  altAvatar: string;
  name: string;
  surname: string;
};

type ChatContextState = {
  loading: boolean;
  chatSession: string;
  userMessage: UserMessage | null;
  messagesFirstRequest: Message[] | [];
};

const ChatContextInitialState: ChatContextState = {
  loading: true,
  chatSession: "",
  userMessage: null,
  messagesFirstRequest: [],
};

export const ChatContext = createContext(ChatContextInitialState);

export const ChatProvider = ({
  receiptUserUUID,
  sendUserUUID,
  children,
}: ChatProviderProps) => {
  const [value, setValue] = useState(ChatContextInitialState);

  useEffect(() => {
    Promise.all([
      chatRepository.getUserByUUID(receiptUserUUID),
      chatRepository.connectChatSession(sendUserUUID, receiptUserUUID),
    ]).then((response) => {
      if (response[0].error === null) {
        document.title = `My chat - ${response[0].user.login}`
        if (response[1].error === null) {
          let session = response[1].chatSession!;
          chatRepository.getMessage(session).then((responseM) => {
            if (responseM.error === null) {
              setValue({
                loading: false,
                chatSession: session,
                userMessage: response[0].user,
                messagesFirstRequest: responseM.messages.map((message: Message) => {
                  message.content = decodeMessage(message.content.toString());
                  if(message.attachMessage){
                    message.attachMessage.content = decodeMessage(message.attachMessage.content.toString());
                  }
                  return message
                }),
              });
            }
          });
        }
      }
    });
  }, []);

  return <ChatContext.Provider value={value}>{children}</ChatContext.Provider>;
};
