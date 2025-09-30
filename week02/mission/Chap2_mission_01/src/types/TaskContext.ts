import { createContext } from "react";
import type { TTask } from "../types/task";

// Context의 타입 정의
interface TaskContextType {
  todoInput: string;
  todoList: TTask[];
  doneList: TTask[];
  setTodoInput: React.Dispatch<React.SetStateAction<string>>;
  setTodoList: React.Dispatch<React.SetStateAction<TTask[]>>;
  setDoneList: React.Dispatch<React.SetStateAction<TTask[]>>;
}

// Context 생성 (초기값은 undefined로 설정)
export const TaskContext = createContext<TaskContextType | undefined>(
  undefined
);