import { MenuList } from "./MenuList";
import { useToggle } from "@/shared/hooks/useToggle";
import Logo from "@/shared/asset/logo.svg?react";
import Menu from "@/shared/asset/menu.svg?react";
import { useResponsive } from "@/shared/hooks/useResponsive";
import { cn } from "@/shared/lib/cn";

const Header = () => {
  const [modalToggle, setModalToggle, optionalToggle] = useToggle();

  const isMobile = useResponsive({
    device: "mobile",
    callback: (state) => {
      if (modalToggle && !state) {
        optionalToggle(false);
      }
    },
  });

  return (
    <header className="tw:@container tw:text-shadow-lg tw:c-shadow-bt tw:fixed tw:w-full tw:h-15 tw:c-bg-theme-strong">
      <div className="tw:max-w-320 tw:h-full tw:m-auto tw:px-4 tw:flex tw:justify-between tw:items-center">
        {/* logo */}
        <div className="tw:flex tw:items-center tw:gap-1">
          <Logo className="tw:w-8 tw:h-8 tw:fill-service-primary tw:cursor-pointer"/>
          <span
            className={cn(
              "tw:text-service-primary tw:text-base tw:font-bold",
              "tw:@3xl:text-lg tw:@5xl:text-xl"
            )}
          >
            BuddyChat
          </span>
        </div>

        {isMobile ? (
          // Mobile
          <>
            <Menu
              onClick={setModalToggle}
              className={cn(
                "tw:w-5 tw:h-5 tw:cursor-pointer tw:fill-service-gray tw:hover:fill-service-secondary",
                { "tw:fill-service-secondary": modalToggle }
              )}
            />
            <div
              className={cn(
                "tw:hidden tw:flex-col tw:gap-3 tw:shadow-down tw:theme-shade1 tw:absolute tw:left-0 tw:right-0 tw:bottom-0 tw:translate-y-full",
                {
                  "tw:flex": modalToggle,
                }
              )}
            >
              <MenuList />
            </div>
          </>
        ) : (
          // Tablet & DeskTop
          <div className="tw:flex tw:grow tw:justify-end tw:gap-3">
            <MenuList />
          </div>
        )}
      </div>
    </header>
  );
};

export default Header;
