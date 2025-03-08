import { useState } from 'react';
import { timeStamp } from "@/shared/lib/time-stamp";

type MessageType = {
    isMine: boolean;
    nickName?: string;
    tiem: Date;
    content: string;
}


const ChatList = () => {
    const [messageList, setMessageList] = useState<MessageType[] | null>(null);
    

    return(
        <div className="tw:h-full tw:p-4 tw:flex tw:flex-col tw:gap-4">

      <div className="tw:overflow-y-scroll tw:grow tw:text-service-gray tw:flex tw:flex-col tw:gap-2">
        <div className="card tw: tw:text-center">
          <p>익명의 상대와 1 : 1 대화를 시작합니다</p>
          <p>{timeStamp(_tempDate)}</p>
        </div>

        <div>
      {!isMine && <span>{nickName}</span>}
      <div className={cn('tw:flex tw:items-center tw:gap-1',{
        "tw:flex-row-reverse": isMine
      }

      )}>
        <span className="tw:bg-service-secondary tw:text-white tw:p-2 tw:rounded-lg">
          {children}
        </span>
        <span>{time}</span>
      </div>
    </div>
      </div>

      <p className="tw:after:content-['.'] tw:after:animate-dotPing">
        상대방이 입력중입니다
      </p>

    </div>
    );
}