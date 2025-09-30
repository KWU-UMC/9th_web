import type { TTask } from "../types/task";
import "../App.css";
import { useTask } from "../hooks/useTask";

type TaskListProps = {
  title: string;
  isDone: boolean;
};

export const TaskList = ({ title, isDone }: TaskListProps) => {
  const { todoList, doneList, setTodoList, setDoneList } = useTask();
  const list = isDone ? doneList : todoList;

  // 할 일 상태 변경 (완료로 이동)
  const completeTask = (task: TTask): void => {
    const changedList = todoList.filter((t) => t.id !== task.id);
    setTodoList(changedList);
    setDoneList([...doneList, task]);
  };

  // 완료된 할 일 삭제 함수
  const deleteTask = (task: TTask): void => {
    const changedDoneTasks = doneList.filter((t) => t.id !== task.id);
    setDoneList(changedDoneTasks);
  };

  // 할 일 아이템 생성 함수
  const createTaskElement = (task: TTask, isDone: boolean): React.ReactNode => {
    return (
      <li key={task.id} className="render-container__item">
        {task.text}
        <button
          className="render-container__item-button"
          style={{ backgroundColor: isDone ? "#dc3545" : "#28a745" }}
          onClick={() => {
            if (isDone) {
              deleteTask(task);
            } else {
              completeTask(task);
            }
          }}
        >
          {isDone ? "삭제" : "완료"}
        </button>
      </li>
    );
  };

  return (
    <div>
      <div className="render-container__section">
        <h2 className="render-container__title">{title}</h2>
        <ul id="todo-list" className="render-container__list">
          {list.map((task) => createTaskElement(task, isDone))}
        </ul>
      </div>
    </div>
  );
};
