import { useDispatch as useDefaultDispatch, useSelector as useDefaultSelector } from "react-redux";
import type { AppDispatch, RootState } from "../components/store/store";
import type { TypedUseSelectorHook } from "react-redux";

export const useDispatch: () => AppDispatch = useDefaultDispatch;
export const useSelector: TypedUseSelectorHook<RootState> = useDefaultSelector;