import {useParams} from "react-router-dom";
import {ChatPageContext, ChatPageProvider} from "@/modules/chat/provider/chat_page_provider.tsx";
import {useContext} from "react";
import {ResizableHandle, ResizablePanel, ResizablePanelGroup} from "@/components/ui/resizable.tsx";
import {Menubar} from "@/components/ui/menubar.tsx";
import {Avatar, AvatarFallback, AvatarImage} from "@/components/ui/avatar.tsx";
import {Button} from "@/components/ui/button.tsx";
import {Send, SmilePlus, X, MoreVertical, Paperclip} from "lucide-react";
import {Input} from "@/components/ui/input.tsx";
import {Chat} from "@/modules/chat/components/chat.tsx";
import {useForm} from "react-hook-form";
import {ChatContext, ChatProvider} from "@/modules/chat/provider/chat_provider.tsx";
import dayjs from "dayjs";

export const ChatPage = () => {
    const sendUserUUID = useParams()?.sendUserUUID ?? '';
    const receiptUserUUID = useParams()?.receiptUserUUID ?? '';

    return (
        <ChatPageProvider sendUserUUID={sendUserUUID} receiptUserUUID={receiptUserUUID}>
            <ChatProvider>
                <ChatPageState/>
            </ChatProvider>
        </ChatPageProvider>
    );
}

const ChatPageState = () => {
    const {userMessage} = useContext(ChatPageContext)

    return (
        <div
            className={"w-full h-full flex-col border rounded p-4 gap-2 "}
            style={{display: "flex", gap: "20px"}}
        >
            <Menubar className={"p-6 flex gap-2"}>
                <div className={"w-full flex items-center justify-between"}>
                    <div className={"flex items-center gap-5"}>
                        <Avatar className={"h-8 w-8"}>
                            <AvatarImage
                                src={userMessage?.avatar ?? ""}
                                alt="@shadcn"
                            />
                            <AvatarFallback>{userMessage?.altAvatar ?? ''}</AvatarFallback>
                        </Avatar>
                        <span className="font-semibold">{userMessage?.username ?? ""}</span>
                    </div>
                    <Button variant={"ghost"} size={"icon"} onClick={() => console.log(userMessage)}>
                        <MoreVertical className={"text-muted-foreground"}/>
                    </Button>
                </div>
            </Menubar>
            <ResizablePanelGroup direction="vertical" className={"border rounded"}>
                <ResizablePanel defaultSize={92}>
                    <div
                        className="flex h-full border-b p-4 overflow-y-scroll scroll-smooth"
                        id={"chat_messages"}
                    >
                        <Chat/>
                    </div>
                </ResizablePanel>
                <AttachedMessage/>
                <ResizableHandle withHandle/>
                <ResizablePanel
                    defaultSize={8}
                    maxSize={40}
                    minSize={8}
                    className={"bg-accent"}
                >
                    <SendInputMessage/>
                </ResizablePanel>
            </ResizablePanelGroup>
        </div>
    );
};

const SendInputMessage = () => {
    const {
        register,
        handleSubmit,
        reset
    } = useForm()

    const {sendMessage} = useContext(ChatPageContext)
    const {attachedMessage, handleRemoveAttach} = useContext(ChatContext);

    // @ts-ignore
    const submitMessage = (data) => {
        sendMessage(data?.message ?? '', attachedMessage)
        handleRemoveAttach();
        reset()
    }

    return (
        <form className={"p-2 flex h-full gap-2"} onSubmit={handleSubmit(submitMessage)}>
            <Button type={"button"}>
                <SmilePlus/>
            </Button>
            <Button type={"button"}>
                <Paperclip/>
            </Button>
            <Input
                placeholder={"Type an message..."}
                className={"bg-background"}
                id={"message_input"}
                {...register("message")}
            />
            <Button type={"submit"}>
                Send
                <Send size={"16"} className={"ml-1"}/>
            </Button>
        </form>
    );
}

const AttachedMessage = () => {
    const {userMessage} = useContext(ChatPageContext)

    const {
        attachedMessage,
        handleRemoveAttach
    } = useContext(ChatContext);

    if (attachedMessage === null) {
        return;
    }

    return (
        <div className={"p-2"}>
            <div className={"flex justify-between items-center"}>
                <div className={"flex-col"}>
                    <div
                        className={"text-primary text-xs flex gap-2"}
                    >
                        <span>{userMessage.username}</span>
                        <span>
                        {dayjs(attachedMessage.sendMessageDateTime).format("HH:mm")}
                        </span>
                    </div>
                    <div className={"text-muted-foreground text-lg"}>{attachedMessage.content}</div>
                </div>
                <div>
                    <Button size={"icon"} variant={"ghost"} onClick={handleRemoveAttach}>
                        <X/>
                    </Button>
                </div>
            </div>
        </div>
    )
}