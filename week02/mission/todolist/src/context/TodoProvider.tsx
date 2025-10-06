import { createContext, useContext, useState, type ReactNode } from "react";
import type { Task, TodoContextType } from "../types/todo";

const TodoContext = createContext<TodoContextType|undefined>(undefined);

export const TodoProvider = ({children}: {children: ReactNode}) =>{
  const [todoList, setTodoList] = useState<Task[]>([]);
  const [doneList, setDoneList] = useState<Task[]>([]);
  const [isDark, setIsDark] = useState(false);
  
  function completeTask(task: Task): void{
    setTodoList(prev => prev.filter((t) => t.id !== task.id));
    setDoneList(prev => [...prev, task]);
  };
  
  function deleteTask(task: Task): void{
    setDoneList(prev => prev.filter((t) => t.id !== task.id));
  };

  function toggleDarkMode(): void{
    if (isDark){
      document.body.style.backgroundColor = '#eef2f3';
    }
    else{
      document.body.style.backgroundColor = '#606060ff';
    }
    setIsDark(prev => !prev);
  }

  return(
    <TodoContext.Provider 
      value={{todoList, doneList, setTodoList, setDoneList, completeTask, deleteTask, isDark, toggleDarkMode}}
    >
      {children}
    </TodoContext.Provider>
  );
};

export const useTodo = () => {
  const context = useContext(TodoContext);
  if(!context){
    throw new Error(
      'useTodo는 반드시 TodoProvider 내부에서 사용되어야 합니다.'
    );
  }
  return context;
}