import { Match } from './Match';
import { Chat } from './Chat';
import { useToggle } from '@/shared/hooks/useToggle';

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
