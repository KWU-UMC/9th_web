import { type FormEvent, useState } from "react";
import { useTodo } from "../context/TodoContext";

export const TodoForm = () => {
  const [input, setInput] = useState<string>("");
  const {addTodo} = useTodo();


  const handleSubmit = (e: FormEvent<HTMLFormElement>): void => {
    e.preventDefault();
    const text = input.trim();
    if (text) {
      addTodo(text);
      setInput(""); // 함수 호출 형태로!
    }
  };
  return (
    <form onSubmit={handleSubmit} className="todo-container__form">
      <input
        value={input}
        onChange={(e): void => setInput(e.target.value)}
        type="text"
        className="todo-container__input"
        placeholder="할일 입력"
        required
      />
      <button type="submit" className="todo-container__button">
        할 일 추가
      </button>
    </form>
  );
};
