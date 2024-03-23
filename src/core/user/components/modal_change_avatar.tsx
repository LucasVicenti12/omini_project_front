import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/custom/dialog";
import { useContext } from "react";
import { AuthContext } from "../provider/auth_provider";
import { Button } from "@/components/ui/button";
import { Check, X } from "lucide-react";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useForm } from "react-hook-form";

type ModalChangeProps = {
  open: boolean;
  closeModal: () => void;
};

export const ModalChangeAvatar = ({ open, closeModal }: ModalChangeProps) => {
  const { user, changeAvatar } = useContext(AuthContext);

  const { register, handleSubmit } = useForm();

  const handleSubmitAvatar = (data: any) => {
    var file = data.avatar[0];

    var reader = new FileReader();

    reader.readAsDataURL(file);
    reader.onload = function (event) {
      var fileBase64 = event?.target?.result;

      changeAvatar(fileBase64!.toString())
    };
  };

  return (
    <Dialog open={open} onOpenChange={() => closeModal()}>
      <DialogContent className="w-full">
        <DialogHeader className="w-full">
          <DialogTitle>Change avatar</DialogTitle>
          <div className="flex-col pt-5 w-full h-full">
            <div className="flex gap-5 w-full h-full">
              <div style={{ width: "50%" }}>
                <Avatar className="w-full h-full" contentEditable>
                {user?.avatar && (
                  <AvatarImage
                    src={user?.avatar ?? ""}
                    alt="@shadcn"
                  />
                )}
                <AvatarFallback className="w-full h-full">{user?.altAvatar ?? ""}</AvatarFallback>
              </Avatar>
              </div>
              <div style={{ width: "50%" }}>
                <form
                  className="flex flex-col w-50 h-full justify-between pt-3 pb-3"
                  onSubmit={handleSubmit(handleSubmitAvatar)}
                >
                  <div className="grid w-full max-w-sm items-center gap-1.5">
                    <Label htmlFor="picture">Picture</Label>
                    <Input
                      type="file"
                      {...register("avatar", { required: true })}
                      accept="images/*"
                    />
                  </div>
                  <div className="flex row w-full gap-4">
                    <Button className="w-full flex items-center">
                      Confirm <Check size={"16"} className={"ml-1"} />
                    </Button>
                    <Button
                      className="w-full flex items-center"
                      onClick={() => closeModal()}
                    >
                      Cancel <X size={"16"} className={"ml-1"} />
                    </Button>
                  </div>
                </form>
              </div>
            </div>
          </div>
        </DialogHeader>
      </DialogContent>
    </Dialog>
  );
};
