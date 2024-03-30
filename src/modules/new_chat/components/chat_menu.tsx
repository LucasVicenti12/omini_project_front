import {Avatar, AvatarFallback, AvatarImage} from "@/components/ui/avatar.tsx";
import {Button} from "@/components/ui/button.tsx";
import {MoreVertical} from "lucide-react";
import {useContext} from "react";
import {ChatContext} from "@/modules/new_chat/provider/chat_provider.tsx";

export const ChatMenu = () => {
    const {userMessage} = useContext(ChatContext);

    return (
        <div
            className={"flex items-center justify-between absolute w-full top-0 backdrop-blur-sm border-b p-3 rounded-t-md z-40"}>
            <div className={"flex items-center gap-5"}>
                <Avatar className={"h-8 w-8"}>
                    <AvatarImage
                        src={userMessage?.avatar ?? ""}
                        alt="@shadcn"
                    />
                    <AvatarFallback>{userMessage?.altAvatar ?? 'TS'}</AvatarFallback>
                </Avatar>
                <div className={"flex flex-col"}>
                    <span className="font-semibold">{userMessage?.login ?? "john doe"}</span>
                    <span className="font-semibold text-xs text-primary">{userMessage?.login ?? "online"}</span>
                </div>
            </div>
            <Button variant={"ghost"} size={"icon"} onClick={() => console.log(userMessage)}>
                <MoreVertical className={"text-muted-foreground"}/>
            </Button>
        </div>
    );
}