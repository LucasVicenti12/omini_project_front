const teste = {
    messageID: "jhsd28793",
    message: "Ola bom dia",
    time: "12:30",
    relation: null
}

export const ReceivedMessage = () => {
    return (
        <div className={"relative min-h-3 border w-auto p-2 bg-muted rounded-b-2xl rounded-r-2xl"}>
            <span className={"text-muted-foreground"}>{teste?.message ?? ''}</span>
            <span className={"text-muted-foreground absolute text-xs -bottom-2 -right-8"}>{teste?.time ?? ''}</span>
        </div>
    );
}