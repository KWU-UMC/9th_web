// src/context/TodoContext.tsx
import React,{ useState, useContext} from 'react';

// Task 타입을 여기서도 정의해줍니다.
export type Task = {
  id: number;
  text: string;
};

// Context가 가지게 될 값들의 타입을 정의합니다.
interface TodoContextType {
  todos: Task[];
  doneTasks: Task[];
  addTodo: (text: string) => void;
  completeTask: (id: number) => void;
  deleteTask: (id: number) => void;
}

// Context를 생성합니다. 처음에는 undefined 상태입니다.
const TodoContext = React.createContext<TodoContextType | undefined>(undefined);

// 상태 관리 로직을 담고, Context 값을 제공할 Provider 컴포넌트입니다.
export const TodoProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [todos, setTodos] = React.useState<Task[]>([]);
  const [doneTasks, setDoneTasks] = React.useState<Task[]>([]);

  const addTodo = (text: string) => {
    if (text.trim()) {
      setTodos(prev => [...prev, { id: Date.now(), text }]);
    }
  };

  const completeTask = (id: number) => {
    const taskToComplete = todos.find(task => task.id === id);
    if (taskToComplete) {
      setTodos(prev => prev.filter(task => task.id !== id));
      setDoneTasks(prev => [...prev, taskToComplete]);
    }
  };

  const deleteTask = (id: number) => {
    setDoneTasks(prev => prev.filter(task => task.id !== id));
  };

  // Context를 통해 전달할 값들을 객체로 묶습니다.
  const value = { todos, doneTasks, addTodo, completeTask, deleteTask };

  return <TodoContext.Provider value={value}>{children}</TodoContext.Provider>;
};

// 다른 컴포넌트에서 Context를 쉽게 사용하기 위한 커스텀 훅입니다.
export const useTodos = () => {
  const context = React.useContext(TodoContext);
  if (context === undefined) {
    throw new Error('useTodos must be used within a TodoProvider');
  }
  return context;
};