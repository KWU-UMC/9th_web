import "../App.css";
import {TaskForm} from "../components/TaskForm";
import {TaskList} from "../components/TaskList";

export const ToDo = () => {
  return (
    <div>
      <div className="todo-container">
        <h1 className="todo-container__header">NARU TODO</h1>
        <TaskForm />
        <div className="render-container">
          <TaskList title="할 일" isDone={false} />
          <TaskList title="완료" isDone={true} />
        </div>
      </div>
    </div>
  );
};
