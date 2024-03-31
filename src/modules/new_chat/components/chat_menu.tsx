import {
  Avatar,
  AvatarFallback,
  AvatarImage,
} from "@/components/ui/avatar.tsx";
import { Button } from "@/components/ui/button.tsx";
import { MoreVertical } from "lucide-react";
import React, { useContext, useState } from "react";
import { ChatContext } from "@/modules/new_chat/provider/chat_provider.tsx";
import { UserMessageModal } from "./user_message_modal";

export const ChatMenu = () => {
  const { userMessage } = useContext(ChatContext);

  const [openModal, setOpenModal] = useState(false);

  const handleOpenUserMessageModal = () => setOpenModal(true);
  const handleCloseUserMessageModal = () => setOpenModal(false);

  return (
    <React.Fragment>
      <div
        className={
          "flex items-center justify-between absolute w-full top-0 backdrop-blur-sm border-b p-3 rounded-t-md z-40"
        }
      >
        <div className={"flex items-center gap-5"}>
          <Avatar className={"h-8 w-8"}>
            <AvatarImage src={userMessage?.avatar ?? ""} alt="@shadcn" />
            <AvatarFallback>{userMessage?.altAvatar ?? "TS"}</AvatarFallback>
          </Avatar>
          <div className={"flex flex-col"}>
            <span className="font-semibold">
              {userMessage?.login ?? "john doe"}
            </span>
            <span className="font-semibold text-xs text-primary">
              {userMessage?.login ?? "online"}
            </span>
          </div>
        </div>
        <Button
          variant={"ghost"}
          size={"icon"}
          className="hover:bg-primary"
          onClick={() => handleOpenUserMessageModal()}
        >
          <MoreVertical />
        </Button>
      </div>
      <UserMessageModal
        open={openModal}
        closeModal={handleCloseUserMessageModal}
      />
    </React.Fragment>
  );
};
