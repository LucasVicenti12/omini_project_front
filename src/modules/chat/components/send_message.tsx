import dayjs from "dayjs";
import {useContext} from "react";
import {AuthContext} from "@/core/user/provider/auth_provider.tsx";
import {ChatPageContext} from "@/modules/chat/provider/chat_page_provider.tsx";

type Message = {
    content: string,
    sendMessageDateTime: string,
    uuid: string,
    attachMessage: Message | null,
    sendUserUUID: string
}

type SendMessageProps = {
    message: Message
}

export const SendMessage = ({message}: SendMessageProps) => {
    const {returnUserUUID} = useContext(AuthContext);
    const {userMessage} = useContext(ChatPageContext);

    const userUUID = returnUserUUID();

    const handleScrollToMessage = (messageUUID: string) => {
        const element = document.getElementById('message_' + messageUUID);
        if (element) {
            element.scrollIntoView({behavior: 'smooth'});
        }
    };

    return (
        <div
            className={"relative min-h-3 w-auto p-2 bg-primary dark:bg-emerald-800 rounded-b-2xl rounded-l-2xl"}
            id={"message_" + message.uuid}
        >
            {
                message.attachMessage && (
                    <div
                        onClick={() => handleScrollToMessage(message.attachMessage?.uuid ?? '')}
                        className={"rounded border-l-4 dark:border-primary p-2 bg-green-700 dark:bg-emerald-950 text-white cursor-pointer"}
                    >
                        <div
                            className={"text-xs dark:text-primary"}>{message.attachMessage.sendUserUUID === userUUID ? "You" : userMessage.username}</div>
                        <div>
                            {message.attachMessage.content}
                        </div>
                    </div>
                )
            }
            <span className={"text-white"}>{message.content ?? ''}</span>
            <span
                className={"text-muted-foreground absolute text-xs -bottom-2 -left-8"}
            >
                {dayjs(message.sendMessageDateTime).format("HH:mm") ?? ''}
            </span>
        </div>
    );
}