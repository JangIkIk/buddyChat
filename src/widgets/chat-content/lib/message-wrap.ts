import { timeStamp } from "@/shared/lib/time-stamp";
import { type MessageType } from "@/entities/use-chat-message-socket";

interface MessageMapperType extends Omit<MessageType, "chatMessage"> {
  chatMessageList: string[];
}

const messageWrap = (
  messageList: MessageMapperType[],
  resData: MessageType
) => {
  try {
    const { chatMessage, ...otherData } = resData;
    const lastList = messageList[messageList.length - 1];

    if (lastList && lastList.sender === resData.sender) {
      if (
        timeStamp(lastList.chatTime, "HH:mm") ===
        timeStamp(resData.chatTime, "HH:mm")
      ) {
        return [
          ...messageList.slice(0, messageList.length - 1),
          {
            ...lastList,
            chatMessageList: [...lastList.chatMessageList, chatMessage],
          },
        ];
      }
    }

    return [
      ...messageList,
      {
        ...otherData,
        chatMessageList: [chatMessage],
      },
    ];
  } catch {
    console.warn("cannot merge the message");
    return [...messageList];
  }
};

export { messageWrap, type MessageMapperType };
