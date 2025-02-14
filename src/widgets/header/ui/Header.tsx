import { MenuList } from "./MenuList";
import { useToggle } from "@/shared/hooks/useToggle";
import Logo from "@/shared/asset/logo.svg?react";
import Menu from "@/shared/asset/menu.svg?react";

const Header = () => {
  const [modalToggle, setModalToggle] = useToggle();
  



  return (
    <div className="tw:@container tw:text-base">
      <div className="tw:px-4 tw:flex tw:justify-between tw:items-center tw:theme-shade1 tw:h-12.5 tw:md:h-15 tw:lg:h-20 tw:shadow-[0_4px_4px_rgba(0,0,0,0.25)]">

        {/* logo */}
        <div className="tw:flex tw:items-center tw:gap-3">
            <Logo className="tw:w-8 tw:h-8 tw:fill-service-primary tw:cursor-pointer tw:@3xl:w-10 tw:@3xl:h-10"/>
            <span className="tw:italic tw:font-black tw:text-service-primary">HeyBuddyChat</span>
        </div>

        {/* Mobile Button */}
        <Menu
          onClick={setModalToggle}
          className={`tw:w-6 tw:h-6 ${modalToggle ? "tw:fill-service-secondary" : "tw:fill-service-gray"} tw:cursor-pointer tw:hover:fill-service-secondary tw:@3xl:hidden`}
        />

        {/* Tablet & DeskTop */}
        <div className="tw:hidden tw:@3xl:flex tw:grow tw:justify-end tw:gap-3">
            <MenuList/>
        </div>

      </div>

      {/* Mobile Modal*/}
      <div className="tw:flex tw:flex-col tw:gap-3 tw:shadow-[0_4px_4px_rgba(0,0,0,0.25)] tw:theme-shade1 tw:absolute tw:left-0 tw:right-0 ">
        {modalToggle ? <MenuList /> : null}
      </div>
    </div>
  );
};

export default Header;
