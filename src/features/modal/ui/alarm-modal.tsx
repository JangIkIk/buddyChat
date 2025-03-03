import { useEffect } from "react";
import { useLocation } from "react-router-dom";
import { Button } from "@/shared/ui/Button";
import { useAlarm } from "@/shared/store/modal-alarm";
import { cn } from "@/shared/lib/cn";

const AlarmModal = () => {
  const isAlarm = useAlarm((state) => state.alarm);
  const cancelAlarm = useAlarm((state) => state.toggleModal);
  const location = useLocation();

  useEffect(() => {
    if (isAlarm) {
      cancelAlarm();
    }
  }, [location.pathname]);

  return (
    <div
      className={cn(
        "tw:fixed tw:left-4 tw:bottom-1 tw:right-4 tw:transition-[translate] tw:translate-y-full",
        {
          "tw:translate-y-0": isAlarm,
        }
      )}
    >
      {isAlarm && (
        <div className="tw:bg-service-gray tw:flex tw:flex-col tw:justify-center tw:items-center tw:gap-2 tw:p-2 tw:rounded-lg tw:opacity-90">
          <p className="tw:text-service-white tw:md:text-lg">
            채팅방을 나가시겠어요?
          </p>
          <div className="tw:flex tw:gap-2">
            <Button intent="cancel" className="tw:py-1">
              나가기
            </Button>
            <Button className="tw:py-1" onClick={cancelAlarm}>
              취소
            </Button>
          </div>
        </div>
      )}
    </div>
  );
};

export { AlarmModal };
