import {ChatContext, Message} from "@/modules/new_chat/provider/chat_provider.tsx";
import {useContext, useState} from "react";
import dayjs from "dayjs";
import {Button} from "@/components/ui/button.tsx";
import {Undo2} from "lucide-react";
import {AuthContext} from "@/core/user/provider/auth_provider.tsx";
import {eventEmmitter} from "@/shared/functions/event_emitter.ts";

type MessageCompProps = {
    message: Message,
    isFirst: boolean,
    isLast: boolean,
    sent: boolean
}

export const MessageComp = ({message, isFirst, isLast, sent}: MessageCompProps) => {
    const {userMessage} = useContext(ChatContext);
    const {user} = useContext(AuthContext);
    const [showAttachMessage, setShowAttachMessage] = useState(false);

    const handleScrollToMessage = (messageUUID: string) => {
        const element = document.getElementById('message_' + messageUUID);
        if (element) {
            element.scrollIntoView({behavior: 'smooth'});
        }
    };

    const handleAttachMessage = () => {
        eventEmmitter.emit("attach_message", message);
    }

    return (
        <div
            id={"message_" + message.uuid}
            className={
                (isFirst ? "mt-20" : "") +
                (isLast ? "mb-20" : "") +
                (sent ? " items-end " : " items-start ") +
                (" flex w-full flex-col p-1")
            }
            onMouseOver={() => setShowAttachMessage(true)}
            onMouseLeave={() => setShowAttachMessage(false)}
        >
            {
                message.attachMessage && (
                    <div
                        className={
                            "mb-1 cursor-pointer " +
                            (sent ? "border-r-2 pr-1" : "border-l-2 pl-1")
                        }
                        onClick={() => handleScrollToMessage(message.attachMessage?.uuid ?? '')}
                    >
                        <div className={"rounded-2xl p-2 bg-neutral-300 dark:bg-neutral-900"}>
                            <div
                                className={"text-xs"}
                            >
                                {message.attachMessage.sendUserUUID === user.uuid ? 'You' : userMessage?.login ?? ''}
                            </div>
                            <div className={"text-md"}>
                                {message.attachMessage.content}
                            </div>
                        </div>
                    </div>
                )
            }
            <div
                className={
                    "rounded " +
                    (sent ? "bg-primary dark:bg-emerald-800 rounded-b-2xl rounded-l-2xl" : "bg-muted rounded-b-2xl rounded-r-2xl") +
                    " p-3 relative"
                }
            >
                <span className={"text-md " + (sent ? "text-white" : "")}>
                    {message.content}
                </span>
                <div
                    className={
                        "absolute text-xs " +
                        (sent ? "bottom-0 -left-8" : "bottom-0 -right-8")
                    }
                >
                    {dayjs(message.sendMessageDateTime).format("HH:mm")}
                </div>
                {
                    showAttachMessage && (
                        <span
                            className={
                                "text-muted-foreground absolute text-xs " +
                                (sent ? "top-0 -left-8" : "top-0 -right-8")
                            }
                        >
                            <Button
                                variant={"ghost"}
                                size={"icon"}
                                className={"h-6 w-6"}
                                onClick={() => handleAttachMessage()}
                            >
                                <Undo2 size={"16"}/>
                            </Button>
                        </span>
                    )
                }
            </div>
        </div>
    )
}