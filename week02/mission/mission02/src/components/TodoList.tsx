import { useTodo } from "../contexts/TodoContext";
import TodoItem from "./TodoItem";

export default function TodoList({ title, mode }: { title: string; mode: "todo" | "done" }) {
  const { todos, done } = useTodo();
  const items = mode === "todo" ? todos : done;

  return (
    <section>
      <h2 className="text-center text-lg font-extrabold mb-3">{title}</h2>
      <ul className="space-y-3">
        {items.map((t) => (
          <TodoItem key={t.id} task={t} mode={mode} />
        ))}
      </ul>
    </section>
  );
}
