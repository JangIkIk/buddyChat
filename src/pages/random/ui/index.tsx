const Random = () => {
  return (
    <div className="tw:h-full tw:text-base tw:c-text-theme-base">
      {/* <div className="tw:h-full tw:c-linear-base tw:text-base tw:c-text-theme-base"> */}
      {/* 매칭전 */}
      {/* <div className="tw:h-full tw:flex tw:flex-col tw:justify-center tw:items-center tw:gap-5">
        <h1 className="tw:text-xl">익명의 상대와 1 : 1 채팅을 시작하세요</h1>
        <button className="tw:bg-service-primary tw:text-service-white tw:py-3 tw:px-4 tw:rounded-lg">
          랜덤채팅 시작하기
        </button>
      </div> */}
      {/* 매칭중 */}
      {/* <div className="tw:h-full tw:flex tw:flex-col tw:justify-center tw:items-center tw:gap-5">
        <h1 className="tw:text-xl">상대를 찾는중... 00 : 01</h1>
        <button className="tw:bg-service-red tw:text-service-white tw:py-3 tw:px-4 tw:rounded-lg">
          매칭취소
        </button>
      </div> */}
      {/* 매칭실패 */}
      {/* <div className="tw:h-full tw:flex tw:flex-col tw:justify-center tw:items-center tw:gap-5">
        <h1 className="tw:text-xl">현재 매칭할 수 있는 사용자가 없습니다.</h1>
        <button className="tw:bg-service-primary tw:text-service-white tw:py-3 tw:px-4 tw:rounded-lg">
          다시찾기
        </button>
      </div> */}
      {/* 채팅 */}
      <div className="tw:h-full tw:p-4 tw:flex tw:flex-col tw:gap-4">
        {/* 채팅내역 */}
        <div className="tw:overflow-y-scroll tw:grow tw:text-service-gray tw:flex tw:flex-col tw:gap-2">
          <div className="tw:p-2 tw:border-1 tw:border-service-secondary tw:rounded-lg tw:text-center">
            <p>익명의 상대와 1 : 1 대화를 시작합니다</p>
            <p>2025-01-01 18:00</p>
          </div>
          {/* 상대방 메세지 */}
          <div>
            <span>상대방</span>
            <div className="tw:flex tw:justify-start tw:items-center tw:gap-1">
              <span className="tw:bg-service-secondary tw:text-white tw:p-2 tw:rounded-lg">
                안녕하세요
              </span>
              <span>16:01</span>
            </div>
          </div>
          {/* 나의 메세지 */}
          <div>
            <div className="tw:flex tw:justify-end tw:items-center tw:gap-1">
              <span>16:01</span>
              <span className="tw:bg-service-secondary tw:text-white tw:p-2 tw:rounded-lg">
                안녕하세요
              </span>
            </div>
          </div>
        </div>
        {/* 채팅 input */}
        <div className="tw:mt-5 tw:p-2 tw:border-1 tw:border-service-secondary tw:rounded-lg tw:flex tw:gap-2 tw:relative">
            <p className="tw:absolute tw:-top-1/2 tw:left-0 tw:right-0 tw:text-service-gray">상대방이 입력중입니다...</p>
          <input
            className="tw:grow tw:outline-none"
            placeholder="채팅 메세지를 입력해주새요"
          />
          <button className="tw:text-sm tw:bg-service-primary tw:text-service-white tw:p-2 tw:rounded-lg">
            보내기
          </button>
          <button className="tw:text-sm tw:bg-service-red tw:text-service-white tw:p-2 tw:rounded-lg">
            나가기
          </button>
        </div>
      </div>
    </div>
  );
};

export default Random;
