import { createContext, useContext, useMemo, useState, ReactNode } from "react";
import { Task } from "../types/task";

type TodoContextType = {
  todos: Task[];
  done: Task[];
  add: (text: string) => void;
  complete: (task: Task) => void;
  remove: (task: Task) => void;
};

const TodoContext = createContext<TodoContextType | null>(null);

export function TodoProvider({ children }: { children: ReactNode }) {
  const [todos, setTodos] = useState<Task[]>([]);
  const [done, setDone] = useState<Task[]>([]);

  const add = (text: string) =>
    setTodos((p) => [...p, { id: Date.now(), text }]);

  const complete = (task: Task) => {
    setTodos((p) => p.filter((t) => t.id !== task.id));
    setDone((p) => [...p, task]);
  };

  const remove = (task: Task) =>
    setDone((p) => p.filter((t) => t.id !== task.id));

  const value = useMemo(
    () => ({ todos, done, add, complete, remove }),
    [todos, done]
  );

  return <TodoContext.Provider value={value}>{children}</TodoContext.Provider>;
}

export function useTodo() {
  const ctx = useContext(TodoContext);
  if (!ctx) throw new Error("useTodo must be used within TodoProvider");
  return ctx;
}
