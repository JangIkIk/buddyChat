import { create } from 'zustand';

const useAlarm = create<AlarmState>((set)=>({
    alarm: false,
    toggleModal: () => set((state) => ({ alarm: !state.alarm})),
}))

export { useAlarm };

type AlarmState = {
    alarm: boolean;
    toggleModal: () => void;
}