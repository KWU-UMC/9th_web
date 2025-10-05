import { useTodo } from "../context/contextProvider";
import TodoListItem from "./TodoListItem";

interface TodoListProps {
  type: "done" | "todo";
  title: string;
}

function TodoList({ type, title }: TodoListProps) {
  const { todos, dones } = useTodo();

  const items = type === "todo" ? todos : dones;

  return (
    <div className="render-container__section">
      <h2 className="render-container__title">{title}</h2>
      <ul id="todo-list" className="render-container__list">
        {items.map((todo) => (
          <TodoListItem key={todo.id} type={type} todo={todo} />
        ))}
      </ul>
    </div>
  );
}

export default TodoList;
