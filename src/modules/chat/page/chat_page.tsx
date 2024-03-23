import { useParams } from "react-router-dom";
import {
  ChatPageContext,
  ChatPageProvider,
} from "@/modules/chat/provider/chat_page_provider.tsx";
import { useContext } from "react";
import {
  ResizableHandle,
  ResizablePanel,
  ResizablePanelGroup,
} from "@/components/ui/resizable.tsx";
import { Menubar } from "@/components/ui/menubar.tsx";
import {
  Avatar,
  AvatarFallback,
  AvatarImage,
} from "@/components/ui/avatar.tsx";
import { Button } from "@/components/ui/button.tsx";
import { Send, SmilePlus } from "lucide-react";
import { Input } from "@/components/ui/input.tsx";
import { Chat } from "@/modules/chat/components/chat.tsx";
import { useForm } from "react-hook-form";

export const ChatPage = () => {
  const sendUserUUID = useParams()?.sendUserUUID ?? "";
  const receiptUserUUID = useParams()?.receiptUserUUID ?? "";

  return (
    <ChatPageProvider
      sendUserUUID={sendUserUUID}
      receiptUserUUID={receiptUserUUID}
    >
      <ChatPageState />
    </ChatPageProvider>
  );
};

const ChatPageState = () => {
  const { userMessage } = useContext(ChatPageContext);

  return (
    <div
      className={"w-full h-full flex-col border rounded p-4 gap-2 "}
      style={{ display: "flex", gap: "20px" }}
    >
      <Menubar className={"p-6 flex gap-2"}>
        <Avatar className={"h-8 w-8"}>
          <AvatarImage
            src={userMessage?.avatar ?? ""}
            alt="@shadcn"
          />
          <AvatarFallback>CN</AvatarFallback>
        </Avatar>
        <span className="font-semibold">{userMessage?.username ?? ""}</span>
      </Menubar>
      <ResizablePanelGroup direction="vertical" className={"border rounded"}>
        <ResizablePanel defaultSize={90}>
          <div
            className="flex h-full border-b p-4 overflow-y-scroll scroll-smooth"
            id={"test"}
          >
            <Chat />
          </div>
        </ResizablePanel>
        <ResizableHandle withHandle />
        <ResizablePanel
          defaultSize={6}
          maxSize={40}
          minSize={8}
          className={"bg-accent"}
        >
          <SendInputMessage />
        </ResizablePanel>
      </ResizablePanelGroup>
    </div>
  );
};

const SendInputMessage = () => {
  const { register, handleSubmit, reset } = useForm();

  const { sendMessage } = useContext(ChatPageContext);

  // @ts-ignore
  const submitMessage = (data) => {
    sendMessage(data?.message ?? "");
    reset();
  };

  return (
    <form
      className={"p-2 flex h-full gap-2"}
      onSubmit={handleSubmit(submitMessage)}
    >
      <Button>
        <SmilePlus />
      </Button>
      <Input
        placeholder={"Type an message..."}
        className={"bg-background"}
        {...register("message")}
      />
      <Button type={"submit"}>
        Send
        <Send size={"16"} className={"ml-1"} />
      </Button>
    </form>
  );
};
