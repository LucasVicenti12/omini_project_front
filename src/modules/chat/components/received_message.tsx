import {Undo2} from "lucide-react";
import {Button} from "@/components/ui/button.tsx";
import {useContext, useState} from "react";
import dayjs from "dayjs";
import {ChatContext} from "@/modules/chat/provider/chat_provider.tsx";

type ReceivedMessageProps = {
    message: {
        content: string,
        time: string,
        uuid: string
    },
}
export const ReceivedMessage = ({message}: ReceivedMessageProps) => {
    const [showAttachMessage, setShowAttachMessage] = useState(false);

    const {handleSetAttechMessage} = useContext(ChatContext)

    const handleAttachMessage = () => {
        handleSetAttechMessage(message)
    }

    return (
        <div
            className={"w-full flex"}
            onMouseOver={() => setShowAttachMessage(true)}
            onMouseLeave={() => setShowAttachMessage(false)}
        >
            <div
                className={"relative min-h-3 border w-auto p-2 bg-muted rounded-b-2xl rounded-r-2xl"}
            >
                <span className={"text-muted-foreground"}>{message.content ?? ''}</span>
                <span
                    className={"text-muted-foreground absolute text-xs -bottom-2 -right-8"}>{dayjs(message.time).format("HH:mm") ?? ''}</span>
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