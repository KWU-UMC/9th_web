import { create } from 'zustand'
import { immer } from 'zustand/middleware/immer';
import { useShallow } from "zustand/shallow";

interface ModalAction {
    openModal: () => void;
    closeModal: () => void;
}

interface ModalState {
    isOpen: boolean;
    actions: ModalAction;
}

export const useModalStore = create<ModalState>()(
  immer((set, ) => ({
    isOpen: false,
    actions: {
        openModal: (): void => {
            set((state) => {
                state.isOpen = true;
            });
        },
        closeModal: (): void => {
            set((state) => {
                state.isOpen = false;
            });
        },
    },
}))
);

export const useModalInfo = () => useModalStore(
    useShallow((state) => ({
        isOpen: state.isOpen,
    }))
);

export const useModalActions = () => useModalStore((state) => state.actions);