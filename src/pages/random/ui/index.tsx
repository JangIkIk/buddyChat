// type
import { type ReactElement } from 'react';
// slice
import { useMatchOnEvents } from "../model/use-match-on-events";
// layer
import ChatContent from "@/widgets/chat-content";
import { ChatInput } from "@/features/chat-Input";
import { ChatOutButton } from "@/features/chat-out-button";
import { Button } from "@/shared/ui/Button";
import { Loading } from "@/shared/ui/Loading";
import { useSocketConnection } from "@/shared/store/use-socket-connection";
import { useMergeList } from "@/shared/store/use-merge-list";

/**
 * @fileoverview
 * - 1:1 랜덤페이지 UI
 * - 매치전, 매치중, 매치실패 UI
 * - 매치완료 UI
 */

const Random = ():ReactElement => {

  const { match, waiting, startMatch, cancelMatch } = useMatchOnEvents();
  
  const { socketAction } = useSocketConnection();
  const connectSocket = () => socketAction.connect("/random");
  const isRoom = useMergeList((state) => state.isRoom);

  return (
    <div className="tw:h-full tw:text-base tw:c-text-theme-base">

      {match ? (
        <div className="tw:h-full tw:flex tw:flex-col tw:p-4 tw:gap-1">
          <ChatContent />
          {!isRoom ? (
            <div className="tw:flex tw:gap-3 tw:items-center">
              <ChatInput />
              <ChatOutButton />
            </div>
          ): <div>다시찾기 버튼</div>}
        </div>
      ) : (
        <div className="tw:h-full tw:c-linear-base tw:flex tw:flex-col tw:justify-center tw:items-center tw:gap-3">
          
          {!waiting && match === null && ( // 매치전
            <>
              <h1 className="tw:text-xl">
                익명의 상대와 1 : 1 채팅을 시작하세요
              </h1>
              <Button intent={"select"} onClick={connectSocket}>
                매칭 시작하기
              </Button>
            </>
          )}
          
          {waiting && ( // 매치중
            <>
              <h1 className="tw:text-xl tw:flex tw:flex-col tw:justify-center tw:items-center tw:gap-3">
                <div className="tw:flex tw:items-center tw:gap-3">
                  <span>상대를 찾는중입니다..</span>
                  <Loading size="tw:size-8" />
                </div>
                <Button intent={"cancel"} onClick={cancelMatch}>
                  매칭 취소
                </Button>
              </h1>
            </>
          )}

          {!waiting && match === false && ( // 매치실패
            <>
              <h1 className="tw:text-xl">
                현재 매칭할 수 있는 사용자가 없습니다.
              </h1>
              <Button intent={"select"} onClick={startMatch}>
                다시찾기
              </Button>
            </>
          )}
        </div>
      )}

    </div>
  );
};

export default Random;
