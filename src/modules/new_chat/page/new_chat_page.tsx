import { useParams } from "react-router-dom";
import { ChatContext, ChatProvider } from "../provider/chat_provider";
import { ChatMenu } from "@/modules/new_chat/components/chat_menu.tsx";
import { useContext } from "react";
import { MessageInput } from "@/modules/new_chat/components/message_input.tsx";
import { MessageContainer } from "@/modules/new_chat/components/message_container.tsx";

export const NewChatPage = () => {
  const receiptUserUUID = useParams()?.receiptUserUUID ?? "";

  return (
    <ChatProvider receiptUserUUID={receiptUserUUID}>
      <ChatPageContent />
    </ChatProvider>
  );
};

const ChatPageContent = () => {
  const { loading } = useContext(ChatContext);

  if (loading) {
    return (
      <div className="w-full h-full p-4">
        <div
          className={
            "border h-full flex items-center justify-center rounded-md relative overflow-hidden"
          }
        >
          <div id="loader_chat">
            <span></span>
            <span></span>
            <span></span>
            <span></span>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="w-full h-full p-4">
      <div className={"border h-full rounded-md relative overflow-hidden"}>
        <ChatMenu />
        <MessageContainer />
        <MessageInput />
      </div>
    </div>
  );
};
