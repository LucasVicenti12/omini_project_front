import { Button } from "@/components/ui/button.tsx";
import { Forward, X } from "lucide-react";
import { Input } from "@/components/ui/input.tsx";
import { useForm } from "react-hook-form";
import { useContext, useEffect, useState } from "react";
import { eventEmmitter } from "@/shared/functions/event_emitter.ts";
import {
  ChatContext,
} from "@/modules/new_chat/provider/chat_provider.tsx";
import dayjs from "dayjs";
import { AuthContext } from "@/core/user/provider/auth_provider.tsx";
import { MessageContext } from "@/modules/new_chat/provider/message_provider.tsx";
import { EmojiMenu } from "./emoji_menu";
import { AttachFileMenu } from "./attach_file_menu";
import {Message} from "../entities/message.ts";

export const MessageInput = () => {
  const { user } = useContext(AuthContext);
  const { userMessage, chatSession } = useContext(ChatContext);
  const { sendMessage } = useContext(MessageContext);

  const { register, handleSubmit, reset } = useForm();

  const [attachedMessage, setAttachedMessage] = useState<Message | null>(null);

  // @ts-ignore
  const submitMessage = (data) => {
    if (!data.message) return;

    let message: Message = {
      uuid: null,
      chatSessionUUID: chatSession,
      content: data.message,
      attachMessage: attachedMessage,
      dateTimeMessage: null,
      sendUserUUID: user.uuid
    }

    sendMessage(message);
    handleRemoveAttach();
    reset();
  };

  const handleRemoveAttach = () => {
    setAttachedMessage(null);
  };

  useEffect(() => {
    const handleShowAttachMessage = (message: Message) => {
      setAttachedMessage(message);
      document.getElementById("message_input")?.focus();
    };

    eventEmmitter.on("attach_message", handleShowAttachMessage);

    return () => {
      eventEmmitter.removeListener("attach_message", handleShowAttachMessage);
    };
  }, []);

  return (
    <div className={"w-full absolute bottom-0 backdrop-blur-lg border-t"}>
      {attachedMessage && (
        <div className={"p-1 pl-4 pr-4 border-b"}>
          <div className={"flex justify-between items-center"}>
            <div className={"flex-col"}>
              <div className={"text-primary text-xs flex gap-2"}>
                <span>
                  {attachedMessage.sendUserUUID === user.uuid
                    ? "You"
                    : userMessage?.login ?? ""}
                  &nbsp;•&nbsp;
                  {dayjs(attachedMessage.dateTimeMessage).format("HH:mm")}
                </span>
              </div>
              <div className={"text-md"}>{attachedMessage.content.toString()}</div>
            </div>
            <div>
              <Button
                size={"icon"}
                className={"hover:bg-primary"}
                variant={"ghost"}
                onClick={handleRemoveAttach}
              >
                <X />
              </Button>
            </div>
          </div>
        </div>
      )}
      <form
        className={"flex h-full gap-2 p-3"}
        onSubmit={handleSubmit(submitMessage)}
      >
        <EmojiMenu />
        <AttachFileMenu />
        <Input
          placeholder={"Type an message..."}
          className={
            "ml-2 mr-2 bg-accent border-none outline-none focus-visible:ring-0"
          }
          id={"message_input"}
          {...register("message")}
        />
        <Button
          type={"submit"}
          variant={"ghost"}
          className={"hover:bg-green-700"}
        >
          <Forward size={"16pt"} />
        </Button>
      </form>
    </div>
  );
};
