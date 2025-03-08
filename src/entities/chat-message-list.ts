import { useEffect, useState } from "react";

const useMessageList = () => {
  const [message, setMessage] = useState<MessageItem | null>(null);
  
  useEffect(()=>{
    const _tempMyChat = setTimeout(()=>{
      setMessage({
        id: 1,
        isMine: true,
        nickName: null,
        time: new Date(),
        content: "안녕하세요",
        type: "message",
      })
    },2000)

    const _tempOtherChat = setTimeout(()=>{
      setMessage({
        id: 2,
        isMine: false,
        nickName: null,
        time: new Date(),
        content: "ㅎㅇ ~",
        type: "message",
      })
    },4000)



    return () => {
      clearTimeout(_tempMyChat);
      clearTimeout(_tempOtherChat);
    }

  },[]);

  return message;
};

type MessageItem = {
  id: number;
  isMine: boolean;
  nickName: string | null;
  time: Date;
  content: string;
  type: "message";
} & {};

export { useMessageList, type MessageItem };
