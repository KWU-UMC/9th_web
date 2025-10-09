import { FormEvent, useState } from "react";
import { useTodo } from "../contexts/TodoContext";
import { useTheme } from "../contexts/ThemeContext";
import { cx } from "../lib/cx";

export default function TodoForm() {
  const { add } = useTodo();
  const { theme } = useTheme();
  const [value, setValue] = useState("");

  const submit = (e: FormEvent) => {
    e.preventDefault();
    const text = value.trim();
    if (!text) return;
    add(text);
    setValue("");
  };

  return (
    <form onSubmit={submit} className="flex gap-3 mb-4">
      <input
        value={value}
        onChange={(e) => setValue(e.target.value)}
        placeholder="할 일 입력"
        required
        className={cx(
          "flex-1 h-11 rounded-xl px-4 text-[15px] font-medium border transition-colors",
          theme === "dark"
            ? "bg-neutral-700 text-neutral-100 border-neutral-600 placeholder-neutral-400"
            : "bg-white text-neutral-900 border-neutral-300 placeholder-neutral-400"
        )}
      />
      <button
        type="submit"
        className="h-11 rounded-xl px-4 text-[15px] font-bold text-white bg-green-600 hover:bg-green-700 transition-colors"
      >
        할 일 추가
      </button>
    </form>
  );
}
