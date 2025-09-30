import type { TTask } from "../types/task";
import { useTask } from "../hooks/useTask";
import { clsx } from "clsx";

type TaskListProps = {
  title: string;
  isDone: boolean;
};

export const TaskList = ({ title, isDone }: TaskListProps) => {
  const { todoList, doneList, isDarkMode, setTodoList, setDoneList } = useTask();
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
      <li key={task.id} 
      className={clsx("flex justify-between items-center p-2 border-b border-gray-300 bg-gray-100 text-black rounded-md mb-1 w-full",
        isDarkMode ? " border-gray-600" : " border-gray-300"
      )}
        >
        {task.text}
        <div
          className={`px-2 py-1 rounded-md text-xs text-white transition-colors duration-300  ${
            isDone ? "bg-red-400 hover:bg-red-600 cursor-pointer" : "bg-green-400 hover:bg-green-600 cursor-pointer"
          }`}
          onClick={() => {
            if (isDone) {
              deleteTask(task);
            } else {
              completeTask(task);
            }
          }}
        >
          {isDone ? "삭제" : "완료"}
        </div>
      </li>
    );
  };

  return (
    <div>
      <div className="w-[150px] text-left">
        <h2 className="text-lg mb-2 text-center">{title}</h2>
        <ul id="todo-list" className="list-none p-0 m-0">
          {list.map((task) => createTaskElement(task, isDone))}
        </ul>
      </div>
    </div>
  );
};
