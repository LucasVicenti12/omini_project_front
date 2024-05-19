import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Input } from "@/components/ui/input";
import { AuthContext } from "@/core/user/provider/auth_provider";
import { Check, Paperclip, X } from "lucide-react";
import { ChangeEvent, useContext, useState } from "react";
import { useForm } from "react-hook-form";
import { ChatContext } from "../provider/chat_provider";
import { Message } from "../entities/message";

export const AttachFileMenu = () => {
  const [openFileAttach, setOpenFileAttach] = useState(false);
  const [imageFile, setImageFile] = useState<string | null>(null);

  const { user } = useContext(AuthContext);
  const { chatSession, handleSendMessage } = useContext(ChatContext);
  const { register, handleSubmit, reset } = useForm();

  const changeFileImage = (evt: ChangeEvent) => {
    let reader = new FileReader();

    // @ts-ignore
    let file = evt.target.files[0];

    reader.readAsDataURL(file);
    reader.onload = function (event) {
      let fileBase64 = event?.target?.result;
      setImageFile(fileBase64!.toString());
    };
  };

  // @ts-ignore
  const sendMessage = (data) => {
    if (!data.message) return;

    let message: Message = {
      uuid: null,
      chatSessionUUID: chatSession,
      content: {
        text: data.message,
        image: imageFile,
      },
      attachMessage: null,
      dateTimeMessage: null,
      sendUserUUID: user.uuid,
      whoSend: null
    };

    handleSendMessage(message);

    reset();
    setImageFile(null);
    setOpenFileAttach(false);
  };

  const handleCloseFileAttach = () => setOpenFileAttach(false);

  return (
    <DropdownMenu
      open={openFileAttach}
      onOpenChange={() => handleCloseFileAttach()}
    >
      <DropdownMenuTrigger>
        <Button
          type={"button"}
          variant={"ghost"}
          className={"hover:bg-green-700"}
          onClick={() => setOpenFileAttach(true)}
        >
          <Paperclip />
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="start" className="mb-4">
        <div
          style={{ width: "600px", height: "450px" }}
          className="p-2 flex flex-col"
        >
          {imageFile ? (
            <form
              className="flex flex-col gap-2 h-full w-full"
              onSubmit={handleSubmit(sendMessage)}
            >
              <div
                className="border rounded flex justify-center"
                style={{ height: "80%" }}
              >
                <img src={imageFile} style={{ height: "100%" }} />
              </div>
              <div
                className="flex flex-col justify-center gap-2"
                style={{ height: "20%" }}
              >
                <Input
                  placeholder={"Type an message..."}
                  className={
                    "bg-accent border-none outline-none focus-visible:ring-0"
                  }
                  id={"message_input"}
                  {...register("message")}
                />
                <div className="flex gap-2">
                  <Button className="w-full" type="submit">
                    Send
                    <Check size={"16"} className={"ml-1"} />
                  </Button>
                  <Button className="w-full" onClick={() => setImageFile(null)}>
                    Cancel
                    <X size={"16"} className={"ml-1"} />
                  </Button>
                </div>
              </div>
            </form>
          ) : (
            <Button
              className="w-full border rounded p-2"
              onClick={() =>
                document.getElementById("message_file_image")?.click()
              }
            >
              Import image
            </Button>
          )}

          <Input
            id={"message_file_image"}
            type="file"
            onChange={(evt) => changeFileImage(evt)}
            accept="images/*"
            style={{ display: "none" }}
          />
        </div>
      </DropdownMenuContent>
    </DropdownMenu>
  );
};
