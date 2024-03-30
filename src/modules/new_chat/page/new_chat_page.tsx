import { useParams } from "react-router-dom";
import { ChatProvider } from "../provider/chat_provider";

export const NewChatPage = () => {
  const sendUserUUID = useParams()?.sendUserUUID ?? "";
  const receiptUserUUID = useParams()?.receiptUserUUID ?? "";

  return (
    <ChatProvider sendUserUUID={sendUserUUID} receiptUserUUID={receiptUserUUID}>
      <ChatPageContent />
    </ChatProvider>
  );
};

const ChatPageContent = () => {
  return <div className="w-full h-full">
    <div>opa</div>
  </div>;
};
