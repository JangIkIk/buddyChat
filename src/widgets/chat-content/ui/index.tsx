// package
import { useEffect, useRef } from 'react';

// slice
import ChatMessage from "./chat-message";
import { useMergeList } from "../../../shared/store/use-merge-list";
// layer
import { useSocketConnection } from "@/shared/store/use-socket-connection";

/**
 * @FileDesc
 * - MergeList type에 따른 UI 구분
 * - 
*/
const ChatContent = () => {
  const { socket } = useSocketConnection();
  const mergeList = useMergeList((state) => state.mergeList);
  const scrollRef = useRef<HTMLDivElement | null>(null);

  useEffect(()=>{
    if(!scrollRef.current) return;
    /*
      1. 자신이 작성한 메세지가 있을시는 스크롤의 위치와 상관없이 최하단으로 이동해야한다.
      2. 상대방이 작성한 메세지가 있을때도 최하단으로 이동해야한다
      3. 일정페이지를 위로 스크롤한이후에 상대방이 메세지를 입력하면 최하단 스크롤이 아닌 밑으로 가기 버튼을 보여줘야한다
      4. 해당버튼을 클릭하면 해당 메세지 위치로 스크롤이 이동되어야 한다.
      

      # 여전히 채팅중에 페이지 이동한후에 다시 매칭하면 데이터가 두번씩 입력된다. 서버껄로 테스트해보고도 문제가 있다면 클라이언트
      문제이므로 확인필요
    */
    scrollRef.current.scrollIntoView({ behavior: 'smooth' });
  },[mergeList])

  return (
    <div className="tw:h-full tw:flex tw:flex-col tw:gap-5 tw:c-bg-theme-strong tw:overflow-y-scroll">
    {/* <div className="tw:h-full tw:flex tw:flex-col tw:gap-5 tw:c-bg-theme-strong  tw:overflow-y-hidden"> */}
      {socket && mergeList.map((item, idx) => {
        switch (item.type) {
          // 채팅메세지
          case "message":
            return <ChatMessage key={idx} {...item} />;
          // 입장알람 (Ui컴포넌트 분리필요)
          case "join":
            return (
              <div
                key={idx}
                className="card tw:text-center tw:text-service-gray tw:p-2"
              >
                <p>익명의 상대와 1 : 1 대화를 시작합니다.</p>
                <p>{item.joinTime}</p>
              </div>
            );
          // 퇴장알람 (UI컴포넌트 분리필요)
          case "out":
            if(socket.id === item.socketId){
              return;
            }
            return (
              <div
                key={idx}
                className="card tw:text-center tw:text-service-gray tw:p-2"
              >
                {`${item.nickName ?? "상대방"}이 채팅방을 나갔습니다.`}
              </div>
            );
        }
      })}
      <div ref={scrollRef}/>
    </div>
  );
};

export default ChatContent;
