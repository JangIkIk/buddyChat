import { Link } from 'react-router-dom';
import { Button } from '@/shared/ui/Button';
import { timeStamp } from "@/shared/lib/time-stamp";

const ReMatch = () => {
    const _tempDate = new Date();
    return(
        <div className="card tw:text-service-gray tw:flex tw:flex-col tw:items-center tw:gap-1">
            <span>익명의 상대와 1 : 1 채팅이 종료되었습니다.</span>
            <span>{`채팅종료: ${timeStamp(_tempDate)}`}</span>
            <span>{`채팅시간: ${timeStamp(_tempDate, "HH-mm")}`}</span>
            <div className='tw:flex tw:gap-2'>
                <Button intent="select">다시찾기</Button>
                <Link to="/">
                <Button intent="select">홈으로</Button>
                </Link>
            </div>
        </div>
    );
}

export default ReMatch;