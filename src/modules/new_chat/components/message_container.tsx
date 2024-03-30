import {Message} from "@/modules/new_chat/provider/chat_provider.tsx";
import {MessageComp} from "@/modules/new_chat/components/message.tsx";
import {useContext, useEffect, useRef} from "react";
import {AuthContext} from "@/core/user/provider/auth_provider.tsx";
import {MessageContext} from "@/modules/new_chat/provider/message_provider.tsx";

export const MessageContainer = () => {
    const {user} = useContext(AuthContext);
    const {messages} = useContext(MessageContext);

    const containerRef = useRef();

    useEffect(() => {
        setTimeout(() => {
            scrollToBottom();
        }, 100)
    }, []);

    const scrollToBottom = () => {
        if (containerRef.current) {
            // @ts-ignore
            containerRef.current.scrollTop = containerRef.current.scrollHeight;
        }
    };

    return (
        // @ts-ignore
        <div className={"flex flex-col overflow-y-scroll h-full p-2"} ref={containerRef}>
            {messages.map((item: Message, index: number) => {
                return (
                    <MessageComp
                        isFirst={index === 0}
                        isLast={index === (messages.length - 1)}
                        message={item}
                        sent={item.sendUserUUID === user.uuid}
                        key={index}
                    />
                )
            })}
        </div>
    )
}