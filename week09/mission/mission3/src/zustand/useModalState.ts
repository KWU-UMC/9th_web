import { create } from "zustand";

import type { ModalState } from "../types";

interface ModalStore extends ModalState {
  openModal: () => void;
  closeModal: () => void;
}
const useModalState = create<ModalStore>((set) => ({
  isOpen: false,
  openModal: () => set({ isOpen: true }),
  closeModal: () => set({ isOpen: false }),
}));
export default useModalState;
