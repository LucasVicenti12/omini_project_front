import dayjs from "dayjs";

type SendMessageProps = {
    message: {
        content: string,
        time: string,
        uuid: string
    },
}

export const SendMessage = ({message}: SendMessageProps) => {
    return (
        <div className={"relative min-h-3 w-auto p-2 bg-primary rounded-b-2xl rounded-l-2xl"}>
            <span className={"text-white"}>{message.content ?? ''}</span>
            <span
                className={"text-muted-foreground absolute text-xs -bottom-2 -left-8"}
            >
                {dayjs(message.time).format("HH:mm") ?? ''}
            </span>
        </div>
    );
}