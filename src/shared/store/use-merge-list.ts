// package
import { create } from 'zustand';
// layer
import { type JoinAlert, type OutAlert } from '@/entities/socket-room-alert';
import { type ChatMessageMapper } from '@/entities/socket-chat-message';
import { timeStamp } from '@/shared/lib/time-stamp';

type MergeList = JoinAlert | OutAlert | ChatMessageMapper; 

type MergeListState = {
    mergeList: MergeList[];
    isRoom: boolean;
};

type MergeListAction = {
    action: {
        saveChatMessage: ( chatContent: ChatMessageMapper) => void;
        saveAlert: ( alert: JoinAlert | OutAlert ) => void;
        checkRoom: () => void;
    };
};

/**
 * @FileDesc
 * - 채팅내용 병합(채팅 메세지, 입장알람, 퇴장알람)
 * - 방입장여부
*/
const useMergeList = create<MergeListState & MergeListAction>((set)=>({
    mergeList: [],
    isRoom: false,

    action: {
        saveChatMessage: ( chatContent ) => {
            set( state => {
                const lastIndex:number = state.mergeList.length - 1;
                const lastValue:MergeList = state.mergeList[lastIndex];

                // message타입이 아니거나, sender가 같지않거나, 시간이 같지않거나
                if(lastValue.type !== "message" || lastValue.sender !== chatContent.sender || timeStamp(lastValue.chatTime, "HH:mm") !== timeStamp(chatContent.chatTime, "HH:mm")){
                    return {mergeList: [...state.mergeList, chatContent]};
                }

                // message타입이고, sender가 같고, 시간이 같다면 마지막메세지에 내용만 추가
                return {mergeList: [
                    ...state.mergeList.slice(0, lastIndex),
                    {
                        ...lastValue,
                        chatMessageList: [
                            ...lastValue.chatMessageList,
                            ...chatContent.chatMessageList
                        ]
                    }
                ]};
            })

        },
        saveAlert: ( alert ) => {
            set(state => ({mergeList: [...state.mergeList, alert]}));
        },
        checkRoom: () => {
            set(state => ({isRoom: !state.isRoom}));
        }
    },
}));

export { useMergeList };