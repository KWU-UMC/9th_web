import { useTodo } from "../contexts/TodoContext";
import TodoItem from "./TodoItem";

type Props = { title: string; mode: "todo" | "done" };

export default function TodoList({ title, mode }: Props) {
  const { todos, done } = useTodo();
  const items = mode === "todo" ? todos : done;

  return (
    <section className="render-container__section">
      <h2 className="render-container__title">{title}</h2>
      <ul className="render-container__list">
        {items.map((task) => (
          <TodoItem key={task.id} task={task} mode={mode} />
        ))}
      </ul>
    </section>
  );
}
