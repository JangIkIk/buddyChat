import { useMatchOnEvents } from "../model/use-match-on-events";
import { Button } from "@/shared/ui/Button";
import { Loading } from "@/shared/ui/Loading";
import ChatContent from "@/widgets/chat-content";
import { ChatInput } from '@/features/chat-Input';
import { ChatOutButton } from '@/features/chat-out-button';
import { useSocketConnection } from "@/shared/store/use-socket-connection";

const Random = () => {
  const { socketAction } = useSocketConnection();
  const connectSocket = () => socketAction.connect("/random"); // local
  // const connectSocket = () => socketAction.connect(""); // server
  const { match, waiting, startHandler, cancelHandler } = useMatchOnEvents();

  return (
    <div className="tw:h-full tw:text-base tw:c-text-theme-base">
      {match ? (
        <div className="tw:h-full tw:flex tw:flex-col tw:p-4 tw:gap-1">
          <ChatContent/>
          <div className="tw:flex tw:gap-3 tw:items-center">
          <ChatInput/>
          <ChatOutButton/>
          </div>
        </div>
      ) : (
        <div className="tw:h-full tw:c-linear-base tw:flex tw:flex-col tw:justify-center tw:items-center tw:gap-3">
          {/* 매칭전 */}
          {!waiting && match === null && (
            <>
              <h1 className="tw:text-xl">
                익명의 상대와 1 : 1 채팅을 시작하세요
              </h1>
              <Button
                intent={"select"}
                onClick={connectSocket}
              >
                매칭 시작하기
              </Button>
            </>
          )}
          {/* 대기중 */}
          {waiting && (
            <>
              <h1 className="tw:text-xl tw:flex tw:flex-col tw:justify-center tw:items-center tw:gap-3">
                <div className="tw:flex tw:items-center tw:gap-3">
                  <span>상대를 찾는중입니다..</span>
                  <Loading size="tw:size-8" />
                </div>
                <Button
                  intent={"cancel"}
                  onClick={cancelHandler}
                >
                  매칭 취소
                </Button>
              </h1>
            </>
          )}
          {/* 사용자를 찾을수 없을시 */}
          { !waiting && match === false && (
            <>
              <h1 className="tw:text-xl">
                현재 매칭할 수 있는 사용자가 없습니다.
              </h1>
              <Button intent={"select"} onClick={startHandler}>다시찾기</Button>
            </>
          )}
        </div>
      )}
    </div>
  );
};

export default Random;
