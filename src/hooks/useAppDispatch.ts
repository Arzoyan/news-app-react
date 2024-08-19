import { TypedUseSelectorHook, useDispatch, useSelector } from "react-redux";
import type { RootState, AppDispatch } from "../store";

// `useAppDispatch` will use the typed `dispatch` from `store`
export const useAppDispatch = () => useDispatch<AppDispatch>();

// `useAppSelector` is a typed version of `useSelector`
export const useAppSelector: TypedUseSelectorHook<RootState> = useSelector;
