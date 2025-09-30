// TodoList.tsx
import type { TTodo } from "../types/todo";

type ButtonVariant = "success" | "danger";

interface TodoListProps {
  title: string;
  todos: TTodo[];
  buttonLabel: string;
  variant: ButtonVariant;        // ✅ new
  onClick: (todo: TTodo) => void;
}

export const TodoList = ({ title, todos, buttonLabel, variant, onClick }: TodoListProps) => {
  return (
    <div className="render-container__section">
      <h2 className="render-container__title">{title}</h2>
      <ul id="todo-list" className="render-container__list">
        {todos.map((todo) => (
          <li key={todo.id} className="render-container__item">
            <span className="render-container__item-text">{todo.text}</span>
            <button
              onClick={() => onClick(todo)}
              className={`btn btn--${variant}`}   // ✅ 클래스 기반
            >
              {buttonLabel}
            </button>
          </li>
        ))}
      </ul>
    </div>
  );
};
