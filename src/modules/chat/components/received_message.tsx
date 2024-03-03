type ReceivedMessageProps = {
    message: string,
    time: string
}
export const ReceivedMessage = ({message, time}: ReceivedMessageProps) => {
    return (
        <div className={"relative min-h-3 border w-auto p-2 bg-muted rounded-b-2xl rounded-r-2xl"}>
            <span className={"text-muted-foreground"}>{message ?? ''}</span>
            <span className={"text-muted-foreground absolute text-xs -bottom-2 -right-8"}>{time ?? ''}</span>
        </div>
    );
}