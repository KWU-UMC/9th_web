import { Task, useTodo } from "../contexts/TodoContext";
import { useTheme } from "../contexts/ThemeContext";
import { cx } from "../lib/cx";

export default function TodoItem({ task, mode }: { task: Task; mode: "todo" | "done" }) {
  const { complete, remove } = useTodo();
  const { theme } = useTheme();
  const isTodo = mode === "todo";

  return (
    <li
      className={cx(
        "flex items-center justify-between px-4 py-3 rounded-2xl border shadow-sm transition-colors",
        theme === "dark"
          ? "bg-neutral-700 border-neutral-600"
          : "bg-neutral-100 border-neutral-200"
      )}
    >
      <span className={cx("font-extrabold truncate", theme === "dark" ? "text-white" : "text-neutral-900")}>
        {task.text}
      </span>
      {isTodo ? (
        <button
          onClick={() => complete(task)}
          className="ml-3 rounded-full px-3 py-1 text-xs font-bold text-white bg-green-600 hover:bg-green-700 transition-colors"
        >
          완료
        </button>
      ) : (
        <button
          onClick={() => remove(task)}
          className="ml-3 rounded-full px-3 py-1 text-xs font-bold text-white bg-red-600 hover:bg-red-700 transition-colors"
        >
          삭제
        </button>
      )}
    </li>
  );
}
