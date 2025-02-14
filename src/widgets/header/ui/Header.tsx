import { Modal } from './Modal';
import { useToggle } from '@/shared/hooks/useToggle';
import Logo from "@/shared/asset/logo.svg?react";
import Menu from "@/shared/asset/menu.svg?react";


const Header = () => {
    const [modalToggle, setModalToggle] = useToggle();

  return (
    <div className="@container">
      <div className="tw:px-4 tw:flex tw:justify-between tw:items-center tw:theme-shade1 tw:h-12.5 tw:md:h-15 tw:lg:h-20 tw:shadow-[0_4px_4px_rgba(0,0,0,0.25)]">
        <Logo className="tw:w-8 tw:h-8 tw:fill-service-primary tw:cursor-pointer" />
        <Menu
          onClick={setModalToggle}
          className="tw:w-6 tw:h-6 tw:fill-service-gray tw:cursor-pointer tw:hover:fill-service-secondary"
        />
      </div>
      <div className="tw:shadow-[0_4px_4px_rgba(0,0,0,0.25)] tw:theme-shade1 tw:absolute tw:left-0 tw:right-0">
        { modalToggle ? <Modal/> : null}
      </div>
    </div>
  );
};

export default Header;
