import { cn } from "@/shared/lib/cn";

const Message = (props: MessageProps) => {
  const { isMine = false, nickName = "상대방", time, children } = props;

  return (
    <div>
      {!isMine && <span>{nickName}</span>}
      <div className={cn('tw:flex tw:items-center tw:gap-1',{
        "tw:flex-row-reverse": isMine
      }

      )}>
        <span className="tw:bg-service-secondary tw:text-white tw:p-2 tw:rounded-lg">
          {children}
        </span>
        <span>{time}</span>
      </div>
    </div>
  );
};

export { Message };

type MessageProps = {
  isMine?: boolean;
  nickName?: string;
  children: string;
  time: string;
} & {};
