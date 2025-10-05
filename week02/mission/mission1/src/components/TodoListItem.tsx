import { useTodo } from "../context/contextProvider";

interface TodoListItemProps {
  type: "done" | "todo";
  todo: {
    id: number;
    text: string;
  };
}

function TodoListItem({ type, todo }: TodoListItemProps) {
  const { completeTodo, deleteTodo } = useTodo();
  const buttonClass =
    type === "todo"
      ? "render-container__item-button"
      : "render-container__item-button--done";
  const handleClick = () =>
    type === "todo" ? completeTodo(todo.id) : deleteTodo(todo.id);

  return (
    <li className="render-container__item">
      <span className="render-container__item-text">{todo.text}</span>
      <button className={buttonClass} onClick={handleClick}>
        {type === "todo" ? "완료" : "삭제"}
      </button>
    </li>
  );
}
export default TodoListItem;
