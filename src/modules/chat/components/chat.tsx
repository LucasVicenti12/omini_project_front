import {ReceivedMessage} from "@/modules/chat/components/received_message.tsx";
import {SendMessage} from "@/modules/chat/components/send_message.tsx";
import {useContext, useEffect} from "react";
import {ChatPageContext} from "@/modules/chat/provider/chat_page_provider.tsx";
import {AuthContext} from "@/core/user/provider/auth_provider.tsx";
import dayjs from "dayjs";

export const Chat = () => {
    const {messages} = useContext(ChatPageContext);
    const {returnUserUUID} = useContext(AuthContext);

    const userUUID = returnUserUUID();

    let date = '';

    useEffect(() => {
        let objDiv = document.getElementById("test");
        if (objDiv) {
            objDiv.scrollTop = objDiv.scrollHeight;
        }
    }, [messages]);

    return (
        <div className={"h-full w-full flex flex-col gap-2"}>
            {
                messages.map((message: any, index: number) => {
                    var DateComponet = <></>;
                    if (date != dayjs(message.sendMessageDateTime).format("DD/MM/YYYY")) {
                        date = dayjs(message.sendMessageDateTime).format("DD/MM/YYYY");
                        DateComponet = (
                            <div className={"flex w-full justify-center mt-6"}>
                                <span className={"p-2 border bg-muted rounded"}>{date}</span>
                            </div>
                        )
                    }
                    if (message.sendUserUUID === userUUID) {
                        return (
                            <>
                                {DateComponet}
                                <div
                                    className={"flex self-end " + (index == (messages.length - 1) && "pb-6")}
                                    key={index}
                                >
                                    <SendMessage
                                        message={message}
                                    />
                                </div>
                            </>
                        )
                    } else {
                        return (
                            <>
                                {DateComponet}
                                <div
                                    className={"flex " + (index == (messages.length - 1) && "pb-6")}
                                    key={index}
                                >
                                    <ReceivedMessage
                                        message={message}
                                    />
                                </div>
                            </>
                        )
                    }
                })
            }
        </div>
    );
}