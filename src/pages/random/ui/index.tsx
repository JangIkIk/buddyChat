import { useMatchEventHandler } from "../api/use-match-evenet-handler";
import { Button } from "@/shared/ui/Button";
import { Loading } from "@/shared/ui/Loading";
import { ChatContent } from "@/widgets/chat-content";
import { ChatInput } from '@/features/chat-Input';

const Random = () => {
  const { match, matchTime,  waiting, matchConnect, matchDisConnect, matchStart } =
    useMatchEventHandler();

  return (
    <div className="tw:h-full tw:text-base tw:c-text-theme-base">
      {match ? (
        <div className="tw:h-full tw:flex tw:flex-col tw:p-4 tw:gap-1">
          <div className="tw:grow-1 tw:overflow-y-scroll">
            <ChatContent matchTime={matchTime} matchStartAlert={"익명의 상대와 1 : 1 대화를 시작합니다"}/>
          </div>
          <ChatInput/>
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
                onClick={matchStart}
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
                  onClick={matchDisConnect}
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
              <Button intent={"select"} onClick={matchConnect}>다시찾기</Button>
            </>
          )}
        </div>
      )}
    </div>
  );
};

export default Random;
