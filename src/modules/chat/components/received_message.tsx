import {Undo2} from "lucide-react";
import {Button} from "@/components/ui/button.tsx";
import {useContext, useState} from "react";
import dayjs from "dayjs";
import {ChatContext} from "@/modules/chat/provider/chat_provider.tsx";
import {AuthContext} from "@/core/user/provider/auth_provider.tsx";
import {ChatPageContext} from "@/modules/chat/provider/chat_page_provider.tsx";

type Message = {
    content: string,
    sendMessageDateTime: string,
    uuid: string,
    attachMessage: Message | null,
    sendUserUUID: string
}

type ReceivedMessageProps = {
    message: Message
}
export const ReceivedMessage = ({message}: ReceivedMessageProps) => {
    const {returnUserUUID} = useContext(AuthContext);

    const userUUID = returnUserUUID();

    const [showAttachMessage, setShowAttachMessage] = useState(false);

    const {handleSetAttechMessage} = useContext(ChatContext)
    const {userMessage} = useContext(ChatPageContext)

    const handleAttachMessage = () => {
        handleSetAttechMessage(message)
        document?.getElementById("message_input")?.focus();
    }

    return (
        <div
            className={"w-full flex"}
            onMouseOver={() => setShowAttachMessage(true)}
            onMouseLeave={() => setShowAttachMessage(false)}
        >
            <div
                className={"relative min-h-3 border w-auto p-2 bg-muted rounded-b-2xl rounded-r-2xl"}
                id={"message_" + message.uuid}
            >
                {
                    message.attachMessage && (
                        <div className={"rounded border-l-4 border-neutral-950 p-2 bg-neutral-300 dark:bg-neutral-900"}>
                            <div
                                className={"text-xs"}>{message.attachMessage.sendUserUUID === userUUID ? "You" : userMessage.username}</div>
                            <div>
                                {message.attachMessage.content}
                            </div>
                        </div>
                    )
                }
                <span className={"text-muted-foreground"}>{message.content ?? ''}</span>
                <span
                    className={"text-muted-foreground absolute text-xs -bottom-2 -right-8"}>{dayjs(message.sendMessageDateTime).format("HH:mm") ?? ''}</span>
                {
                    showAttachMessage && (
                        <span className={"text-muted-foreground absolute text-xs bottom-4 -right-10"}>
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
    );
}