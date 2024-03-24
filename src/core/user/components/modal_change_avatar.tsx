import {
    Dialog,
    DialogContent,
    DialogHeader,
    DialogTitle,
} from "@/components/custom/dialog";
import {ChangeEvent, useContext, useState} from "react";
import {AuthContext} from "../provider/auth_provider";
import {Button} from "@/components/ui/button";
import {Check, Pen, X} from "lucide-react";
import {Avatar, AvatarFallback, AvatarImage} from "@/components/ui/avatar";
import {Input} from "@/components/ui/input";

type ModalChangeProps = {
    open: boolean;
    closeModal: () => void;
};

export const ModalChangeAvatar = ({open, closeModal}: ModalChangeProps) => {
    const {user, changeAvatar} = useContext(AuthContext);

    const handleSubmitAvatar = () => {
        // @ts-ignore
        let file = document.getElementById("file_image_avatar")?.files[0];

        let reader = new FileReader();

        reader.readAsDataURL(file);
        reader.onload = function (event) {
            let fileBase64 = event?.target?.result;

            changeAvatar(fileBase64!.toString())
        };
    };

    const [
        imageFile,
        setImageFile
    ] = useState<string | null>(null);

    const changeFileImage = (evt: ChangeEvent) => {
        let reader = new FileReader();

        // @ts-ignore
        let file = evt.target.files[0];

        reader.readAsDataURL(file);
        reader.onload = function (event) {
            let fileBase64 = event?.target?.result;
            setImageFile(fileBase64!.toString());
        };
    }

    return (
        <Dialog open={open} onOpenChange={() => {
            closeModal()
        }}>
            <DialogContent className="w-full">
                <DialogHeader className="w-full">
                    <DialogTitle>Change avatar</DialogTitle>
                    <div className="flex-col pt-5 w-full h-full">
                        <div className="flex flex-col gap-10 w-full h-full">
                            <div className={"w-full h-60 flex justify-center"}>
                                <CustomAvatarImage
                                    avatar={user?.avatar}
                                    altAvatar={user.altAvatar}
                                    newAvatar={imageFile}
                                />
                            </div>
                            <div
                                className="flex flex-col w-full justify-between"
                            >
                                <Input
                                    id={"file_image_avatar"}
                                    type="file"
                                    onChange={(evt) => changeFileImage(evt)}
                                    accept="images/*"
                                    style={{display: "none"}}
                                />
                                <div className="flex row w-full gap-4">
                                    <Button className="w-full flex items-center" onClick={() => handleSubmitAvatar()}>
                                        Confirm <Check size={"16"} className={"ml-1"}/>
                                    </Button>
                                    <Button
                                        className="w-full flex items-center"
                                        onClick={() => closeModal()}
                                        type={"button"}
                                    >
                                        Cancel <X size={"16"} className={"ml-1"}/>
                                    </Button>
                                </div>
                            </div>
                        </div>
                    </div>
                </DialogHeader>
            </DialogContent>
        </Dialog>
    );
};

type AvatarImageProps = {
    avatar: string | null,
    newAvatar: any | null,
    altAvatar: string,
}

const CustomAvatarImage = ({avatar, altAvatar, newAvatar}: AvatarImageProps) => {

    const [
        showChangeFile,
        setShowChangeFile
    ] = useState<boolean>(false);

    return (
        <Avatar
            className="w-1/2 h-full relative"
            onMouseOver={() => setShowChangeFile(true)}
            onMouseLeave={() => setShowChangeFile(false)}
        >
            {avatar && (
                <AvatarImage
                    src={newAvatar != null ? newAvatar : avatar ?? ""}
                    alt="@shadcn"
                />
            )}
            <AvatarFallback className="w-full h-full">{altAvatar ?? ""}</AvatarFallback>
            {showChangeFile && (
                <div
                    className={"absolute rounded-full bg-neutral-950 bg-opacity-60 w-full h-full flex justify-center items-center cursor-pointer"}
                    onClick={() => document.getElementById("file_image_avatar")?.click()}
                >
                    <div className={"flex flex-col items-center gap-2 text-white"}>
                        <Pen/>
                        <div className={"text-white"}>Change image</div>
                    </div>
                </div>
            )}
        </Avatar>
    )
}