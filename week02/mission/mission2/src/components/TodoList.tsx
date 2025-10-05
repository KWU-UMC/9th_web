import clsx from "clsx";
import { useTodo } from "../context/contextProvider";
import TodoListItem from "./TodoListItem";
import { useTheme } from "../context/themeProvider";

interface TodoListProps {
  type: "done" | "todo";
  title: string;
}

function TodoList({ type, title }: TodoListProps) {
  const { todos, dones } = useTodo();

  const items = type === "todo" ? todos : dones;
  const { theme } = useTheme();
  return (
    <div className="w-full text-left">
      <h2
        className={clsx("text-lg mb-2.5 flex justify-center", {
          "text-white": theme === "DARK",
          "text-black": theme === "LIGHT",
        })}
      >
        {title}
      </h2>
      <ul id="todo-list" className="list-none p-0 m-0">
        {items.map((todo) => (
          <TodoListItem key={todo.id} type={type} todo={todo} />
        ))}
      </ul>
    </div>
  );
}

export default TodoList;
