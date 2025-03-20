import { type ReactElement } from "react";
import { cn } from "@/shared/lib/cn";

type ModalProps = {
  children: ReactElement;
  isShow: boolean;
} & {};

const ModalScreenBottom = ( props: ModalProps) => {
  const { children, isShow } = props;
  
  return (
    <div
      className={cn(
        "tw:fixed tw:left-0 tw:right-0 tw:bottom-0 tw:transition-[translate] tw:translate-y-full",
        {
          "tw:translate-y-0": isShow
        }
      )}
    >
        {children}
    </div>
  );
};

export default ModalScreenBottom;

 



