import { FormEvent, useState } from "react";
import { useTodo } from "../contexts/TodoContext";

export default function TodoForm() {
  const { add } = useTodo();
  const [value, setValue] = useState("");

  const submit = (e: FormEvent) => {
    e.preventDefault();
    const text = value.trim();
    if (!text) return;
    add(text);
    setValue("");
  };

  return (
    <form className="todo-container__form" onSubmit={submit}>
      <input
        className="todo-container__input"
        placeholder="할 일 입력"
        value={value}
        onChange={(e) => setValue(e.target.value)}
        required
      />
      <button className="todo-container__button" type="submit">
        할 일 추가
      </button>
    </form>
  );
}
