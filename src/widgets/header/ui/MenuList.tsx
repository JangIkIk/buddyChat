import Home from "@/shared/asset/home.svg?react";
import Random from "@/shared/asset/random.svg?react";
import Group from "@/shared/asset/group.svg?react";
import Theme from "@/shared/asset/theme.svg?react";

export const MenuList = () => {
  return (
    <>
      <div className="tw:flex tw:gap-3 tw:p-3 tw:group tw:cursor-pointer tw:min-w-30">
        <Home className="tw:w-5 tw:h-5 tw:text-balck tw:fill-service-gray tw:group-hover:fill-service-secondary" />
        <span className="tw:group-hover:text-service-secondary tw:text-service-black tw:text-base tw:font-medium">
          홈
        </span>
      </div>

      <div className="tw:flex tw:gap-3 tw:p-3 tw:group tw:cursor-pointer tw:min-w-30">
        <Random className="tw:w-5 tw:h-5 tw:text-balck tw:fill-service-gray tw:group-hover:fill-service-secondary" />
        <span className="tw:group-hover:text-service-secondary tw:text-service-black tw:text-base tw:font-medium">
          랜덤채팅
        </span>
      </div>

      <div className="tw:flex tw:gap-3 tw:p-3 tw:group tw:cursor-pointer tw:min-w-30">
        <Group className="tw:w-5 tw:h-5 tw:text-balck tw:fill-service-gray tw:group-hover:fill-service-secondary" />
        <span className="tw:group-hover:text-service-secondary tw:text-service-black tw:text-base tw:font-medium">
          그룹채팅
        </span>
      </div>

      <div className="tw:flex tw:gap-3 tw:p-3 tw:group tw:cursor-pointer tw:min-w-30">
        <Theme className="tw:w-5 tw:h-5 tw:text-balck tw:fill-service-gray tw:group-hover:fill-service-secondary" />
        <span className="tw:group-hover:text-service-secondary tw:text-service-black tw:text-base tw:font-medium">
          테마변경
        </span>
      </div>
    </>
  );
};
