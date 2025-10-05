import { useState } from "react";
import { useTodo } from "../context/contextProvider";
import clsx from "clsx";
import { useTheme } from "../context/themeProvider";

function TodoForm() {
  const [input, setInput] = useState("");
  const { addTodo } = useTodo();
  const handleInput = (e: React.ChangeEvent<HTMLInputElement>) => {
    setInput(e.target.value);
  };
  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    addTodo({ id: Date.now(), text: input });
    setInput("");
  };
  const { theme } = useTheme();
  return (
    <form id="todo-form" className="flex gap-2.5 mb-5" onSubmit={handleSubmit}>
      <input
        type="text"
        id="todo-input"
        className={clsx(
          "flex-1 px-2 py-2 border border-gray-300 rounded-md text-sm",
          {
            "bg-gray-700 border-gray-600 text-white": theme === "DARK",
            "bg-white border-gray-300 text-black": theme === "LIGHT",
          }
        )}
        placeholder="할 일 입력"
        required
        value={input}
        onChange={handleInput}
      />
      <button
        type="submit"
        className="bg-green-600 text-white border-0 px-3 py-2 cursor-pointer rounded-md transition-colors duration-300 ease-in-out hover:bg-green-700"
      >
        할 일 추가
      </button>
    </form>
  );
}

export default TodoForm;
