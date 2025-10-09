import { createContext, useContext, useMemo, useState, ReactNode } from "react";

export type Task = { id: number; text: string };

type TodoCtx = {
  todos: Task[];
  done: Task[];
  add: (text: string) => void;
  complete: (t: Task) => void;
  remove: (t: Task) => void;
};

const TodoContext = createContext<TodoCtx | null>(null);

export function TodoProvider({ children }: { children: ReactNode }) {
  const [todos, setTodos] = useState<Task[]>([]);
  const [done, setDone] = useState<Task[]>([]);

  const add = (text: string) => setTodos((p) => [...p, { id: Date.now(), text }]);
  const complete = (t: Task) => {
    setTodos((p) => p.filter((x) => x.id !== t.id));
    setDone((p) => [...p, t]);
  };
  const remove = (t: Task) => setDone((p) => p.filter((x) => x.id !== t.id));

  const value = useMemo(() => ({ todos, done, add, complete, remove }), [todos, done]);

  return <TodoContext.Provider value={value}>{children}</TodoContext.Provider>;
}

export function useTodo() {
  const ctx = useContext(TodoContext);
  if (!ctx) throw new Error("useTodo must be used within TodoProvider");
  return ctx;
}
