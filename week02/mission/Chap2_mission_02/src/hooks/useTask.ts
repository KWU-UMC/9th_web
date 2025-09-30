import { useContext } from "react";
import { TaskContext } from "../types/TaskContext";

export const useTask = () => {
  const context = useContext(TaskContext);
  if (!context) {
    throw new Error(
      'useTask는 반드시 TaskProvider 내부에서 사용되어야 합니다.'
    );
  }
  return context;
};