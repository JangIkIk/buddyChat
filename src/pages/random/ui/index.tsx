import { Match } from './Match';
import { useToggle } from '@/shared/hooks/useToggle';
import { Chat } from '@/widgets/chat';

const Random = () => {
  // temp
  const [_chatStart, _setChatStart] = useToggle(false);

  return (
    <div className="tw:h-full tw:text-base tw:c-text-theme-base">
      { _chatStart ? <Chat/> : <Match _setChatStart={_setChatStart}/>}
    </div>
  );
};

export default Random;
