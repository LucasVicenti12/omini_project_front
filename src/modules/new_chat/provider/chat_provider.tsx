import { ReactNode, createContext } from "react";

type ChatProviderProps = {
  sendUserUUID: string;
  receiptUserUUID: string;
  children: ReactNode;
};

const ChatContextInitialState = {
  chatSession: "",
  userMessage: null,
  messages: []
}

export const ChatContext = createContext(ChatContextInitialState);

export const ChatProvider = ({receiptUserUUID, sendUserUUID, children}: ChatProviderProps) => {

  const value = {
    chatSession: "",
    userMessage: null,
    messages: []
  };

  return (
    <ChatContext.Provider value={value}>
      {children}
    </ChatContext.Provider>
  );
}