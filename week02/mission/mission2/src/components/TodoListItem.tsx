import { useTodo } from "../context/contextProvider";
import { useTheme } from "../context/themeProvider";
import clsx from "clsx";

interface TodoListItemProps {
  type: "done" | "todo";
  todo: {
    id: number;
    text: string;
  };
}

function TodoListItem({ type, todo }: TodoListItemProps) {
  const { completeTodo, deleteTodo } = useTodo();
  const { theme } = useTheme();

  const handleClick = () =>
    type === "todo" ? completeTodo(todo.id) : deleteTodo(todo.id);

  return (
    <li
      className={clsx(
        "flex justify-between items-center p-2 border-b rounded-md mb-1.5 w-full",
        {
          "bg-gray-700 border-gray-600": theme === "DARK",
          "bg-gray-50 border-gray-200": theme === "LIGHT",
        }
      )}
    >
      <span
        className={clsx(
          "flex-1 whitespace-nowrap overflow-hidden text-ellipsis block",
          {
            "text-white": theme === "DARK",
            "text-black": theme === "LIGHT",
          }
        )}
      >
        {todo.text}
      </span>
      <button
        className={clsx(
          "text-white border-0 px-2.5 py-1.5 cursor-pointer rounded-md text-xs transition-colors duration-300 ease-in-out",
          {
            "bg-green-600 hover:bg-green-700": type === "todo",
            "bg-red-600 hover:bg-red-700": type === "done",
          }
        )}
        onClick={handleClick}
      >
        {type === "todo" ? "완료" : "삭제"}
      </button>
    </li>
  );
}

export default TodoListItem;
