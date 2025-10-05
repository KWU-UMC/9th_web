import "./App.css";
import TodoForm from "./components/TodoForm";
import TodoList from "./components/TodoList";
import ThemeToggleButton from "./components/ThemeToggleButton";
import clsx from "clsx";
import { useTheme } from "./context/themeProvider";

function App() {
  const { theme } = useTheme();
  return (
    <div
      className={clsx(
        "flex w-screen h-screen justify-center items-center transition-all",
        {
          "bg-gray-900": theme === "DARK",
          "bg-gray-200": theme === "LIGHT",
        }
      )}
    >
      <div
        className={clsx(
          "flex flex-col p-5 rounded-xl shadow-lg w-[350px] text-center transition-all",
          {
            "bg-gray-800": theme === "DARK",
            "bg-white": theme === "LIGHT",
          }
        )}
      >
        <ThemeToggleButton />
        <h1
          className={clsx("text-2xl mb-4 font-sans", {
            "text-white": theme === "DARK",
            "text-black": theme === "LIGHT",
          })}
        >
          TODO
        </h1>
        <TodoForm />
        <div className="flex justify-between gap-5">
          <TodoList type="todo" title="할 일" />
          <TodoList type="done" title="완료" />
        </div>
      </div>
    </div>
  );
}

export default App;
