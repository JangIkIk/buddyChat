export const Home = () => {
  return (
    <div className="tw:overflow-y-scroll tw:snap-y tw:h-screen tw:snap-mandatory tw:@container tw:c-text-theme-base tw:text-base">

      <div className="tw:snap-center tw:w-screen tw:flex tw:flex-col tw:justify-center tw:items-center tw:h-full tw:gap-10 tw:m-auto tw:c-linear-base">
        <p className="tw:px-4 tw:@2xl:w-[672px]">
          <span className="tw:text-xl tw:text-service-primary">Buddy Chat이란?</span> 타인의 시선에서 벗어나 자유로운 대화를 즐길 수 있습니다.
          익명으로 소통하고 가볍게 이야기를 나누거나 깊은
          대화를 나눠보세요. 부담 없이 속마음을 털어놓을 수 있는 공간에서 새로운
          사람들과 색다른 대화를 경험할 수 있습니다.
        </p>
        <button className="tw:bg-service-primary tw:text-service-white tw:py-2 tw:px-4 tw:rounded-lg">
          랜덤채팅 시작하기
        </button>
      </div>

      <div className="tw:snap-center tw:h-full tw:flex tw:flex-col tw:gap-5 tw:p-4 tw:@5xl:w-[1024px] tw:m-auto">
        <h2 className="tw:font-bold tw:text-xl">이런게 가능해요!</h2>
        <div>
          <h2 className="tw:font-bold tw:py-1">랜덤채팅</h2>
          <p className="tw:text-service-gray tw:shadow-md tw:p-2 tw:rounded-b-lg">
            🌟 1:1 랜덤 매칭으로 예측 불가능한 대화를 시작하세요! 전혀 예상치
            못한 상대와의 만남! Buddy Chat의 1:1 랜덤 매칭 기능을 통해 새로운
            인연을 만들어 보세요. 선입견 없이 있는 그대로의 대화를 즐기며 진정한
            소통의 가치를 느껴보세요.
          </p>
        </div>

        <div>
          <h2 className="tw:font-bold tw:py-1">그룹채팅</h2>
          <p className="tw:text-service-gray tw:shadow-md tw:p-2 tw:rounded-b-lg">
            💬 익명성을 지키면서 그룹 채팅을 즐겨보세요! 완벽한 익명성이
            보장되는 그룹 채팅을 통해 다양한 사람들과 함께 자유롭게 의견을 나눌
            수 있습니다. 공통의 관심사를 가진 사람들과 함께 대화하며 부담 없이
            생각을 공유해 보세요.
          </p>
        </div>
      </div>

      <div className="tw:snap-center tw:h-full tw:p-4 tw:@5xl:w-[1024px] tw:m-auto">
        <h2 className="tw:font-bold tw:text-xl">새로운소식</h2>
        <ul className="tw:pt-2 tw:flex tw:flex-col tw:gap-5">
          <li className="tw:p-4 tw:flex tw:flex-col tw:gap-4 tw:c-shadow-bt tw:rounded-lg tw:c-bg-theme-strong tw:hover:bg-service-secondary tw:group tw:cursor-pointer">
            <div className="tw:flex tw:items-center tw:justify-between">
              <span className="tw:font-bold tw:group-hover:text-service-white">2025-03-01</span>
              <span className="tw:text-sm tw:text-service-gray tw:group-hover:text-service-white">v3.0.0</span>
            </div>
            <p className="tw:group-hover:text-service-white">새로운 업데이트를 진행했습니다. 영상 채팅이 가능합니다....</p>
          </li>
        </ul>
      </div>
    </div>
  );
};
