import { createContext, useContext, useState, type ReactNode } from "react";

interface Todo {
  id: number;
  text: string;
}

interface TodoContextProps {
  todos: Todo[];
  dones: Todo[];
  addTodo: (value: Todo) => void;
  completeTodo: (id: number) => void;
  deleteTodo: (id: number) => void;
}

const TodoContext = createContext<TodoContextProps | null>(null);

export function TodoProvider({ children }: { children: ReactNode }) {
  const [todos, setTodos] = useState<Todo[]>([]);
  const [dones, setDones] = useState<Todo[]>([]);

  const addTodo = (value: Todo) => setTodos((prev) => [...prev, value]);

  const completeTodo = (id: number) => {
    const todo = todos.find((t) => t.id === id);
    if (!todo) return;

    setDones((prev) => [...prev, todo]);
    setTodos((prev) => prev.filter((t) => t.id !== id));
  };

  const deleteTodo = (id: number) =>
    setDones((prev) => prev.filter((t) => t.id !== id));

  return (
    <TodoContext.Provider
      value={{ todos, dones, addTodo, completeTodo, deleteTodo }}
    >
      {children}
    </TodoContext.Provider>
  );
}

export function useTodo() {
  const ctx = useContext(TodoContext);
  if (!ctx) throw new Error("useTodo must be used within TodoProvider");
  return ctx;
}

export default TodoProvider;
