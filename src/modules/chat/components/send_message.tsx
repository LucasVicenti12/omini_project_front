type SendMessageProps = {
  message: string;
  time: string;
};

export const SendMessage = ({ message, time }: SendMessageProps) => {
  return (
    <div
      className={
        "relative h-auto p-2 bg-primary rounded-b-2xl rounded-l-2xl max-w-48 overflow-hidden"
      }
    >
      <span className={"text-white h-auto text-wrap"}><p>{message ?? ""}</p></span>
      <span
        className={"text-muted-foreground absolute text-xs -bottom-2 -left-8"}
      >
        {time ?? ""}
      </span>
    </div>
  );
};
