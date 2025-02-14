import Home from "@/shared/asset/home.svg?react";
import Random from "@/shared/asset/random.svg?react";
import Group from "@/shared/asset/group.svg?react";
import Theme from "@/shared/asset/theme.svg?react";

export const Modal = () => {
  return (
    <div className="tw:text-base tw:flex tw:flex-col tw:gap-3 tw:p-3">
      <div className="tw:flex tw:gap-3 tw:p-1 tw:group tw:cursor-pointer">
        <Home className="tw:w-5 tw:h-5 tw:text-balck tw:fill-service-gray tw:group-hover:fill-service-secondary" />
        <span className="tw:group-hover:text-service-secondary tw:text-service-gray tw:text-base">
          홈
        </span>
      </div>

      <div className="tw:flex tw:gap-3 tw:p-1 tw:group tw:cursor-pointer">
        <Random className="tw:w-5 tw:h-5 tw:text-balck tw:fill-service-gray tw:group-hover:fill-service-secondary" />
        <span className="tw:group-hover:text-service-secondary tw:text-service-gray tw:text-service">
          랜덤채팅
        </span>
      </div>

      <div className="tw:flex tw:gap-3 tw:p-1 tw:group tw:cursor-pointer">
        <Group className="tw:w-5 tw:h-5 tw:text-balck tw:fill-service-gray tw:group-hover:fill-service-secondary" />
        <span className="tw:group-hover:text-service-secondary tw:text-service-gray">
          그룹채팅
        </span>
      </div>

      <div className="tw:flex tw:gap-3 tw:p-1 tw:group tw:cursor-pointer">
        <Theme className="tw:w-5 tw:h-5 tw:text-balck tw:fill-service-gray tw:group-hover:fill-service-secondary" />
        <span className="tw:group-hover:text-service-secondary tw:text-service-gray">
          테마변경
        </span>
      </div>
    </div>
  );
};
