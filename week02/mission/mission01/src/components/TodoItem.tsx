import { Task } from "../types/task";
import { useTodo } from "../contexts/TodoContext";

type Props = {
  task: Task;
  mode: "todo" | "done";
};

export default function TodoItem({ task, mode }: Props) {
  const { complete, remove } = useTodo();

  const isTodo = mode === "todo";
  const text = isTodo ? "완료" : "삭제";
  const color = isTodo ? "btn-green" : "btn-red";
  const onClick = () => (isTodo ? complete(task) : remove(task));

  return (
    <li className="render-container__item">
      <span className="render-container__item-text">{task.text}</span>
      <button className={`render-container__item-button ${color}`} onClick={onClick}>
        {text}
      </button>
    </li>
  );
}
