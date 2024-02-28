import {ReceivedMessage} from "@/modules/chat/components/received_message.tsx";
import {SendMessage} from "@/modules/chat/components/send_message.tsx";
import {useContext} from "react";
import {ChatPageContext} from "@/modules/chat/provider/chat_page_provider.tsx";

export const Chat = () => {
    const {messages} = useContext(ChatPageContext);

    return (
        <div className={"h-full w-full flex flex-col gap-3"}>
            <div className={"flex"}>
                <ReceivedMessage/>
            </div>
            {
                messages.map((message: any, index: number) => (
                    <div className={"flex self-end"} key={index}>
                        <SendMessage message={message.message} time={"12:30"} />
                    </div>
                ))
            }
            <div className={"flex w-full justify-center mt-6"}>
                <span className={"p-2 border bg-muted rounded"}>12/03/2024</span>
            </div>
        </div>
    );
}