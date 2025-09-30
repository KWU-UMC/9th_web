import type { Task } from "../tasktype";

type Props = {
  task: Task;
  actionLabel: "완료" | "삭제";
  onClick(task: Task): void;
};

export default function TaskItem({ task, actionLabel, onClick }: Props) {
  return (
    <li className="render-container__item">
      <span className="render-container__item-text">{task.text}</span>
      <button className="render-container__item-button" onClick={() => onClick(task)}>
        {actionLabel}
      </button>
    </li>
  );
}
