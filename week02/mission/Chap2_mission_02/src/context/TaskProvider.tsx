import { useState } from "react";
import type { TTask } from "../types/task";
import type { ReactNode } from "react";
import { TaskContext } from "../types/TaskContext";

// Context Provider 생성
export const TaskProvider = ({ children }: { children: ReactNode }) => {
  const [todoInput, setTodoInput] = useState("");
  const [todoList, setTodoList] = useState<TTask[]>([]);
  const [doneList, setDoneList] = useState<TTask[]>([]);
  const [isDarkMode, setIsDarkMode] = useState(false);

  return (
    <TaskContext.Provider
      value={{
        todoInput,
        todoList,
        doneList,
        isDarkMode,
        setTodoInput,
        setTodoList,
        setDoneList,
        setIsDarkMode,
      }}
    >
      {children}
    </TaskContext.Provider>
  );
};