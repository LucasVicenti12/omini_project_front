import { ChatContext } from "@/modules/new_chat/provider/chat_provider.tsx";
import { useContext, useState } from "react";
import dayjs from "dayjs";
import { Button } from "@/components/ui/button.tsx";
import { Undo2 } from "lucide-react";
import { AuthContext } from "@/core/user/provider/auth_provider.tsx";
import { eventEmmitter } from "@/shared/functions/event_emitter.ts";
import { Message } from "@/modules/new_chat/entities/message.ts";
import { Dialog, DialogContent } from "@/components/custom/dialog";

type MessageCompProps = {
  message: Message;
  isLast: boolean;
  isMe: boolean;
};

export const MessageComp = ({ message, isLast, isMe }: MessageCompProps) => {
  const { userMessage } = useContext(ChatContext);
  const { user } = useContext(AuthContext);
  const [showAttachMessage, setShowAttachMessage] = useState(false);
  const [openImage, setOpenImage] = useState(false);

  const handleScrollToMessage = (messageUUID: string) => {
    const element = document.getElementById("message_" + messageUUID);
    if (element) {
      element.scrollIntoView({ behavior: "smooth" });
    }
  };

  const handleAttachMessage = () => {
    eventEmmitter.emit("attach_message", message);
  };

  const handleCloseImage = () => {
    setOpenImage(false);
  };

  return (
    <div
      id={"message_" + message.uuid}
      className={
        (isLast ? "mb-20" : "") +
        (isMe ? " items-end " : " items-start ") +
        " flex w-full flex-col p-1"
      }
      onMouseOver={() => setShowAttachMessage(true)}
      onMouseLeave={() => setShowAttachMessage(false)}
    >
      {message.attachMessage && (
        <div
          className={"mb-1 cursor-pointer "}
          onClick={() =>
            handleScrollToMessage(message.attachMessage?.uuid ?? "")
          }
        >
          <div className={"rounded-2xl p-2 bg-neutral-300 dark:bg-neutral-900"}>
            <div className={"text-xs"}>
              {message.attachMessage.sendUserUUID === user.uuid
                ? "You"
                : userMessage?.login ?? ""}
            </div>
            <div className={"text-md"}>
              {typeof message.attachMessage.content == "object" ? (
                <div
                  className="p-2"
                  style={{
                    maxWidth: "300px",
                  }}
                >
                  <img
                    // @ts-ignore
                    src={message.attachMessage.content?.image ?? ""}
                    className="rounded"
                  />
                  <div
                    style={{
                      maxWidth: "300px",
                      textWrap: "wrap",
                      height: "auto",
                      wordWrap: "break-word",
                      whiteSpace: "pre-wrap",
                    }}
                  >
                    {/* @ts-ignore */}
                    {message.attachMessage.content.text.toString()}
                  </div>
                </div>
              ) : (
                <div
                  style={{
                    maxWidth: "300px",
                    textWrap: "wrap",
                    height: "auto",
                    wordWrap: "break-word",
                    whiteSpace: "pre-wrap",
                  }}
                >
                  {message.content.toString()}
                </div>
              )}
            </div>
          </div>
        </div>
      )}
      <div
        className={
          "rounded " +
          (isMe
            ? "bg-primary dark:bg-emerald-800 rounded-b-2xl rounded-l-2xl"
            : "bg-muted rounded-b-2xl rounded-r-2xl") +
          " p-3 relative"
        }
      >
        <span className={"text-md " + (isMe ? "text-white" : "")}>
          {typeof message.content == "object" ? (
            <div
              className="p-2"
              style={{
                maxWidth: "400px",
              }}
            >
              <img
                // @ts-ignore
                src={message.content?.image ?? ""}
                className="rounded cursor-pointer"
                onClick={() => setOpenImage(true)}
              />
              <ImageDialog
                open={openImage}
                onClose={handleCloseImage}
                // @ts-ignore
                image={message.content?.image}
              />
              <div
                style={{
                  maxWidth: "400px",
                  textWrap: "wrap",
                  height: "auto",
                  wordWrap: "break-word",
                  whiteSpace: "pre-wrap",
                }}
              >
                {message.content.text.toString()}
              </div>
            </div>
          ) : (
            <div
              style={{
                maxWidth: "400px",
                textWrap: "wrap",
                height: "auto",
                wordWrap: "break-word",
                whiteSpace: "pre-wrap",
              }}
            >
              {message.content.toString()}
            </div>
          )}
        </span>
        <div
          className={
            "absolute text-xs " +
            (isMe ? "bottom-0 -left-8" : "bottom-0 -right-8")
          }
        >
          {dayjs(message.dateTimeMessage).format("HH:mm")}
        </div>
        {showAttachMessage && (
          <span
            className={
              "text-muted-foreground absolute text-xs " +
              (isMe ? "top-0 -left-8" : "top-0 -right-8")
            }
          >
            <Button
              variant={"ghost"}
              size={"icon"}
              className={"h-6 w-6"}
              onClick={() => handleAttachMessage()}
            >
              <Undo2 size={"16"} />
            </Button>
          </span>
        )}
      </div>
    </div>
  );
};

type ImageDialogProps = {
  open: boolean;
  onClose: () => void;
  image: string;
};

const ImageDialog = ({ open, onClose, image }: ImageDialogProps) => (
  <Dialog open={open} onOpenChange={() => onClose()}>
    <DialogContent className="w-full">
      <img src={image} className="rounded cursor-pointer" />
    </DialogContent>
  </Dialog>
);
