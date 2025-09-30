import type { Task } from "../tasktype";
import TaskItem from "./TaskItem";

type Props = {
  title: string;
  tasks: Task[];
  actionLabel: "완료" | "삭제";
  onItemClick(task: Task): void;
};

export default function TaskList({ title, tasks, actionLabel, onItemClick }: Props) {
  return (
    <section className="render-container__section">
      <h2 className="render-container__title">{title}</h2>
      <ul className="render-container__list">
        {tasks.map((t) => (
          <TaskItem key={t.id} task={t} actionLabel={actionLabel} onClick={onItemClick} />
        ))}
      </ul>
    </section>
  );
}
