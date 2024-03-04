import {Undo2} from "lucide-react";
import {Button} from "@/components/ui/button.tsx";
import {useState} from "react";

type ReceivedMessageProps = {
    message: string,
    time: string
}
export const ReceivedMessage = ({message, time}: ReceivedMessageProps) => {
    const [showAttachMessage, setShowAttachMessage] = useState(false);

    return (
        <div
            className={"relative min-h-3 border w-auto p-2 bg-muted rounded-b-2xl rounded-r-2xl"}
            onMouseOver={() => setShowAttachMessage(true)}
            onMouseLeave={() => {
                setTimeout(() => {
                    setShowAttachMessage(false)
                }, 2000)
            }}
        >
            <span className={"text-muted-foreground"}>{message ?? ''}</span>
            <span className={"text-muted-foreground absolute text-xs -bottom-2 -right-8"}>{time ?? ''}</span>
            {
                showAttachMessage && (
                    <span className={"text-muted-foreground absolute text-xs bottom-4 -right-10"}>
                        <Button variant={"ghost"} size={"icon"} className={"h-5 w-5"}>
                        <Undo2 size={"16"}/>
                            </Button>
                    </span>
                )
            }
        </div>
    );
}