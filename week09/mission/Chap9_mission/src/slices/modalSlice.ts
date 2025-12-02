import { createSlice } from '@reduxjs/toolkit'

// 모달을 켜고/끄는 상태 값을 `modalSlice`에서 관리해주세요.(예: `isOpen: false`)
interface ModalState {
    isOpen: boolean;
}


const initialState: ModalState = { 
    isOpen: false,
};

// 모달을 열기(open), 닫기(close) 위한 reducer 함수: openModal(), closeModal()
const modalSlice = createSlice({
  name: 'modal',
  initialState,
  reducers: {
    // 모달 열기
    openModal(state) {
        state.isOpen = true;
    },
    // 모달 닫기
    closeModal(state) {
        state.isOpen = false;
    },
  },
})

// 액션 생성자 내보내기
export const { openModal, closeModal } = modalSlice.actions

// duck pattern reducer는 export default로 내보내야함.
const modalReducer = modalSlice.reducer;

export default modalReducer;