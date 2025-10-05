import { useState } from "react";
import { useTodo } from "../context/contextProvider";

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

  return (
    <form
      id="todo-form"
      className="todo-container__form"
      onSubmit={handleSubmit}
    >
      <input
        type="text"
        id="todo-input"
        className="todo-container__input"
        placeholder="할 일 입력"
        required
        value={input}
        onChange={handleInput}
      />
      <button type="submit" className="todo-container__button">
        할 일 추가
      </button>
    </form>
  );
}

export default TodoForm;
