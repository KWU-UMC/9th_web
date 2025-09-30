import "../App.css";
import { useTask } from "../hooks/useTask";

export const TaskForm = () => {
  const { todoInput, todoList, setTodoInput, setTodoList } = useTask();

  const handleInput = (input: string): void => {
    const inputText = input.trim();
    setTodoInput(inputText);
  };

  // 할 일 추가 함수
  const addTodo = (text: string): void => {
    const todo = { id: Date.now(), text };
    setTodoList([...todoList, todo]);
    setTodoInput("");
  };
  
  return (
    <form id="todo-form" className="todo-container__form">
      <input
        type="text"
        id="todo-input"
        className="todo-container__input"
        placeholder="할 일 입력"
        required
        value={todoInput}
        onChange={(e) => handleInput(e.target.value)}
      />
      <button
        type="submit"
        className="todo-container__button"
        onClick={(e) => {
          e.preventDefault();
          if (todoInput) {
            addTodo(todoInput);
          }
        }}
      >
        할 일 추가
      </button>
    </form>
  );
};
