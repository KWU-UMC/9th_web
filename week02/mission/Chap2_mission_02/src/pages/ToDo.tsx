import { TaskForm } from "../components/TaskForm";
import { TaskList } from "../components/TaskList";
import { Toggle } from "../components/Toggle";
import { clsx } from "clsx";
import { useTask } from "../hooks/useTask";

export const ToDo = () => {
  const { isDarkMode } = useTask();
  return (
    <div
      className={clsx(
        "font-sans flex flex-col justify-center items-center w-screen h-screen m-0",
        isDarkMode ? "bg-[#303030]" : "bg-[#eef2f3]"
      )}
    >
      <Toggle />
      <div
        className={clsx(
          "p-5 rounded-xl shadow-md w-[350px] text-center",
          isDarkMode ? "bg-[#3f3f3f] text-white" : "bg-white text-black"
        )}
      >
        <div className="text-3xl font-extrabold mb-4">NARU TODO</div>
        <TaskForm />
        <div className="flex justify-between">
          <TaskList title="할 일" isDone={false} />
          <TaskList title="완료" isDone={true} />
        </div>
      </div>
    </div>
  );
};
