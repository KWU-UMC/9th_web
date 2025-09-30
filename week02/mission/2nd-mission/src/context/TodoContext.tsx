import { createContext, type PropsWithChildren, useState, useContext } from "react";
import type { TTodo } from "../types/todo"; // ✅ type-only import

interface ITodoContext {
  todos: TTodo[];
  doneTodos: TTodo[];
  completeTodo: (todo: TTodo) => void;
  deleteTodo: (todo: TTodo) => void;
  addTodo: (text: string) => void;
}

export const TodoContext = createContext<ITodoContext | undefined>(undefined);

export const TodoProvider = ({ children }: PropsWithChildren): Element => { // ✅ JSX.Element
  const [todos, setTodos] = useState<TTodo[]>([]);
  const [doneTodos, setDoneTodos] = useState<TTodo[]>([]);

  const addTodo = (text: string): void => {
    const newTodo: TTodo = { id: Date.now(), text };
    setTodos((prev) => [...prev, newTodo]);
  };

  const completeTodo = (todo: TTodo): void => {
    setTodos((prev) => prev.filter((t) => t.id !== todo.id));
    setDoneTodos((prev) => [...prev, todo]);
  };

  const deleteTodo = (todo: TTodo): void => {
    setDoneTodos((prev) => prev.filter((t) => t.id !== todo.id));
  };

  return(
    <TodoContext.Provider value={{ todos, doneTodos, completeTodo, deleteTodo, addTodo }}>
      {children}
    </TodoContext.Provider>
  );
};

export const useTodo = (): ITodoContext => { // ✅ void → ITodoContext
  const context = useContext(TodoContext);    // ✅ useContext import 필수
  if (!context) {
    throw new Error("useTodo는 반드시 <TodoProvider> 내부에서만 사용해야 합니다.");
  }
  return context;
};
