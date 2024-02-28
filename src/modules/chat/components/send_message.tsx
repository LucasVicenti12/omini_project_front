type SendMessageProps = {
    message: string,
    time: string
}

export const SendMessage = ({message, time}: SendMessageProps) => {
    return (
        <div className={"relative min-h-3 w-auto p-2 bg-primary rounded-b-2xl rounded-l-2xl"}>
            <span className={"text-white"}>{message ?? ''}</span>
            <span className={"text-muted-foreground absolute text-xs -bottom-2 -left-8"}>{time ?? ''}</span>
        </div>
    );
}