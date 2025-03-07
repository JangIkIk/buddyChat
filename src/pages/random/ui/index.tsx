import { Button } from "@/shared/ui/Button";
import { useSocketConnection } from "@/entities/socket-connection";
import { useEffect } from "react";
import { Loading } from "@/shared/ui/Loading";
import { useRandomMatch } from "@/entities/random-match";

const Random = () => {
  const { socket, socketAction } = useSocketConnection();
  const { match, timeout, waiting, connectedSocket, matchAction } =
    useRandomMatch();

  // socket이 존재할시 socket 전달
  useEffect(() => {
    if (!socket) return;
    matchAction.setSocket(socket);
  }, [socket]);

  // 전달된 socket을 받으면 매칭시작
  useEffect(() => {
    if (!connectedSocket) return;
    matchAction.start();
  }, [connectedSocket]);

  return (
    <div className="tw:h-full tw:text-base tw:c-text-theme-base">
      <div className="tw:h-full tw:c-linear-base tw:flex tw:flex-col tw:justify-center tw:items-center tw:gap-3">
        {match ? (
          <div>채팅시작</div>
        ) : (
          <>
            {!waiting && !timeout && (
              <>
                <h1 className="tw:text-xl">
                  익명의 상대와 1 : 1 채팅을 시작하세요
                </h1>
                <Button intent={"select"} onClick={socketAction.connect}>
                  매칭 시작하기
                </Button>
              </>
            )}

            {waiting && (
              <>
                <h1 className="tw:text-xl tw:flex tw:flex-col tw:justify-center tw:items-center tw:gap-3">
                  <div className="tw:flex tw:items-center tw:gap-3">
                    <span>상대를 찾는중입니다..</span>
                    <Loading size="tw:size-8" />
                  </div>
                  <Button intent={"cancel"} onClick={matchAction.end}>
                    매칭 취소
                  </Button>
                </h1>
              </>
            )}
            {!waiting && timeout && (
              <>
                <h1 className="tw:text-xl">
                  현재 매칭할 수 있는 사용자가 없습니다.
                </h1>
                <Button intent={"select"} onClick={matchAction.start}>
                  다시찾기
                </Button>
              </>
            )}
          </>
        )}
      </div>
    </div>
  );
};

export default Random;
