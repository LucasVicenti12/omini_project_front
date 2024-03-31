import { Dialog, DialogContent } from "@/components/custom/dialog";
import { useContext } from "react";
import { ChatContext } from "../provider/chat_provider";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";

type UserMessageModalProps = {
  open: boolean;
  closeModal: () => void;
};

export const UserMessageModal = ({
  open,
  closeModal,
}: UserMessageModalProps) => {
  const { userMessage } = useContext(ChatContext);

  return (
    <Dialog open={open} onOpenChange={() => closeModal()}>
      <DialogContent className="w-full">
        <div className="flex flex-col w-full h-full gap-4">
          <div className={"w-full flex justify-center"}>
            <Avatar style={{ height: "150px", width: "150px" }}>
              {userMessage?.avatar && (
                <AvatarImage src={userMessage.avatar} alt="@shadcn" />
              )}
              <AvatarFallback className="w-full h-full">
                {userMessage?.altAvatar ?? ""}
              </AvatarFallback>
            </Avatar>
          </div>
          <div className="flex flex-col w-full gap-4 items-center">
            <span className="text-xl">
              {userMessage?.login ?? ""} (
              {(userMessage?.name ?? "") + " " + (userMessage?.surname ?? "")})
            </span>
            <span className="text-muted">{userMessage?.email ?? ""}</span>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
};
