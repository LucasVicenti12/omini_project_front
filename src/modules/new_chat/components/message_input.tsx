import {Button} from "@/components/ui/button.tsx";
import {Forward, Paperclip, SmilePlus, X} from "lucide-react";
import {Input} from "@/components/ui/input.tsx";
import {useForm} from "react-hook-form";
import {useContext, useEffect, useState} from "react";
import {eventEmmitter} from "@/shared/functions/event_emitter.ts";
import {ChatContext, Message} from "@/modules/new_chat/provider/chat_provider.tsx";
import dayjs from "dayjs";
import {AuthContext} from "@/core/user/provider/auth_provider.tsx";
import {MessageContext} from "@/modules/new_chat/provider/message_provider.tsx";

export const MessageInput = () => {
    const {user} = useContext(AuthContext);
    const {userMessage} = useContext(ChatContext);
    const {sendMessage} = useContext(MessageContext);

    const {
        register,
        handleSubmit,
        reset
    } = useForm();

    const [
        attachedMessage,
        setAttachedMessage
    ] = useState<Message | null>(null);

    // @ts-ignore
    const submitMessage = (data) => {
        if (!data.message) return;
        sendMessage(data.message, attachedMessage);
        handleRemoveAttach();
        reset()
    }

    const handleRemoveAttach = () => {
        setAttachedMessage(null);
    }

    useEffect(() => {
        const handleShowAttachMessage = (message: Message) => {
            setAttachedMessage(message)
        }

        eventEmmitter.on("attach_message", handleShowAttachMessage);

        return () => {
            eventEmmitter.removeListener("attach_message", handleShowAttachMessage);
        }
    }, []);

    return (
        <div className={"w-full absolute bottom-0 backdrop-blur-lg border-t"}>
            {
                attachedMessage && (
                    <div className={"p-1 pl-4 pr-4 border-b"}>
                        <div className={"flex justify-between items-center"}>
                            <div className={"flex-col"}>
                                <div
                                    className={"text-primary text-xs flex gap-2"}
                                >
                                    <span>
                                        {attachedMessage.sendUserUUID === user.uuid ? 'You' : userMessage?.login ?? ''}
                                        &nbsp;•&nbsp;
                                        {dayjs(attachedMessage.sendMessageDateTime).format("HH:mm")}
                                    </span>
                                </div>
                                <div className={"text-md"}>{attachedMessage.content}</div>
                            </div>
                            <div>
                                <Button
                                    size={"icon"}
                                    className={"hover:bg-primary"}
                                    variant={"ghost"}
                                    onClick={handleRemoveAttach}
                                >
                                    <X/>
                                </Button>
                            </div>
                        </div>
                    </div>
                )
            }
            <form className={"flex h-full gap-2 p-3"} onSubmit={handleSubmit(submitMessage)}>
                <Button type={"button"} variant={"ghost"} className={"hover:bg-green-700"}>
                    <SmilePlus/>
                </Button>
                <Button type={"button"} variant={"ghost"} className={"hover:bg-green-700"}>
                    <Paperclip/>
                </Button>
                <Input
                    placeholder={"Type an message..."}
                    className={"ml-2 mr-2 bg-accent border-none outline-none focus-visible:ring-0"}
                    id={"message_input"}
                    {...register("message")}
                />
                <Button type={"submit"} variant={"ghost"} className={"hover:bg-green-700"}>
                    <Forward size={"16pt"}/>
                </Button>
            </form>
        </div>
    );
}