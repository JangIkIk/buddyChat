import ChatOut from "@/shared/asset/out.svg?react";
import { useToggle } from "@/shared/hooks/useToggle";
import ModalScreenBottom from '@/shared/ui/modal-screen-bottom';
import { Button } from "@/shared/ui/Button";

const ChatOutButton = () => {
  const [modal, setModal] = useToggle(false);
  return (
    <>
      <ChatOut
        className="tw:fill-service-gray tw:size-5 tw:cursor-pointer tw:hover:fill-service-secondary"
        onClick={setModal}
      />
      <ModalScreenBottom isShow={modal}>
        <div className="tw:bg-service-gray tw:flex tw:flex-col tw:justify-center tw:items-center tw:gap-2 tw:p-5 tw:rounded-lg tw:opacity-90">
          <p className="tw:text-service-white tw:md:text-lg">
            채팅방을 나가시겠어요?
          </p>
          <div className="tw:flex tw:gap-2">
            <Button intent="cancel" className="tw:py-1">
              나가기
            </Button>
            <Button className="tw:py-1" onClick={setModal}>
              취소
            </Button>
          </div>
        </div>
      </ModalScreenBottom>
    </>
  );
};

export default ChatOutButton;
