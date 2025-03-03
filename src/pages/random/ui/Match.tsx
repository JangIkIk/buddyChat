import { useState, useEffect } from "react";
import { Loading } from "@/shared/ui/Loading";
import { Button } from "@/shared/ui/Button";

// temp_type
const Match = ( props: {_setChatStart: () => void}) => {
  const { _setChatStart } = props;
  const [_tempSocket, _setTempSocket] = useState(false);
  const [_tempFail, _setTempFail] = useState<boolean | null>(null);

  // temp___________________________________
  // API명세서에 따라 바뀔예정
  const _tempReMatch = () => {
    _setTempFail(null);
    _setTempSocket(true);
    setTimeout(()=>{
      _setChatStart()
    },2000)

  }

  useEffect(()=>{
    if(_tempSocket){
      setTimeout(()=>{
        _setTempSocket(false);
        _setTempFail(true)
      },2000)
    }
  },[_tempSocket])
  // temp___________________________________

  return (
    <div className="tw:h-full tw:c-linear-base tw:flex tw:flex-col tw:justify-center tw:items-center tw:gap-3">
      {/* socket 연결전 */}
      {!_tempFail && !_tempSocket && (
        <>
          <h1 className="tw:text-xl">익명의 상대와 1 : 1 채팅을 시작하세요</h1>
          <Button intent={"select"} onClick={() => _setTempSocket(true)}>
            매칭 시작하기
          </Button>
        </>
      )}

      {/* socket 연결후 매칭중일때 */}
      {!_tempFail && _tempSocket && (
        <>
          <h1 className="tw:text-xl tw:flex tw:flex-col tw:justify-center tw:items-center tw:gap-3">
            <div className="tw:flex tw:items-center tw:gap-3"><span>상대를 찾는중입니다..</span><Loading size="tw:size-8" /></div>
            <Button intent={"cancel"} onClick={()=>_setTempSocket(true)}>
              매칭 취소
            </Button>
          </h1>
        </>
      )}

      {/* 매칭실패일경우 */}
      {!_tempSocket && _tempFail && (
        <>
          <h1 className="tw:text-xl">현재 매칭할 수 있는 사용자가 없습니다.</h1>
          <Button intent={"select"} onClick={_tempReMatch}>다시찾기</Button>
        </>
      )}
    </div>
  );
};

export { Match };
