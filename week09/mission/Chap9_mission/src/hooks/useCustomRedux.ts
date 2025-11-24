import { useDispatch as useDefaultDispatch, useSelector as useDefaultSelector } from "react-redux";
import type { TypedUseSelectorHook } from "react-redux";
import type { RootState, AppDispatch } from "../store/store";

// 커스텀 useSelector 훅
export const useSelector: TypedUseSelectorHook<RootState> = useDefaultSelector;

// 커스텀 useDispatch 훅
export const useDispatch: () => AppDispatch = useDefaultDispatch;