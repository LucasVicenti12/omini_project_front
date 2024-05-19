import { MessageComp } from "@/modules/new_chat/components/message.tsx";
import React, { useContext, useEffect, useRef } from "react";
import { Message } from "@/modules/new_chat/entities/message.ts";
import { ChatContext } from "../provider/chat_provider";
import dayjs from "dayjs";

export const MessageContainer = () => {
  const { messages } = useContext(ChatContext);

  const containerRef = useRef();

  useEffect(() => {
    setTimeout(() => {
      scrollToBottom();
    }, 100);
  }, [messages]);

  const scrollToBottom = () => {
    if (containerRef.current) {
      // @ts-ignore
      containerRef.current.scrollTop = containerRef.current.scrollHeight;
    }
  };

  let dateProcedure = "";
  return (
    <div
      className={"flex flex-col overflow-y-scroll h-full p-2"}
      style={{ paddingTop: "4rem" }}
      // @ts-ignore
      ref={containerRef}
    >
      {messages.map((item: Message, index: number) => {
        let date = dayjs(item.dateTimeMessage).format("DD/MM/YYYY");
        if (dateProcedure != date) {
          dateProcedure = date;
          return (
            <React.Fragment>
              <div className="p-1 flex justify-center">
                <div className="bg-muted p-2 rounded">{date}</div>
              </div>
              <MessageComp
                key={index}
                isLast={index === messages.length - 1}
                message={item}
                isMe={item.whoSend?.isMe!!}
              />
            </React.Fragment>
          );
        }

        return (
          <MessageComp
            key={index}
            isLast={index === messages.length - 1}
            message={item}
            isMe={item.whoSend?.isMe!!}
          />
        );
      })}
    </div>
  );
};
