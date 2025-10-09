import TodoForm from "./components/TodoForm";
import TodoList from "./components/TodoList";
import ThemeToggle from "./components/ThemeToggle"; 

import { useTheme } from "./contexts/ThemeContext";
import { cx } from "./lib/cx";

export default function App() {
  const { theme } = useTheme();

  return (
    <div
      className={cx(
        "min-h-dvh grid place-items-center transition-colors",
        theme === "dark" ? "bg-neutral-900" : "bg-[#eef2f3]"
      )}
    >
      <div
        className={cx(
          "w-[560px] rounded-[22px] shadow-2xl p-6 transition-colors",
          theme === "dark"
            ? "bg-neutral-800 text-neutral-100"
            : "bg-white text-neutral-900"
        )}
      >
        <div className="flex items-center justify-between mb-4">
          <h1 className="m-0 text-3xl font-extrabold tracking-wide">TODO LIST</h1>
          { }
          <ThemeToggle />
        </div>

        <TodoForm />

        <div className="grid grid-cols-2 gap-6">
          <TodoList title="할 일" mode="todo" />
          <TodoList title="완료" mode="done" />
        </div>
      </div>
    </div>
  );
}
