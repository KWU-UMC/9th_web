// src/App.tsx  (상태는 App이 보유, 자식에 props로 전달)
import { useState } from "react";
import "./index.css";
import type { Task } from "./tasktype";
import TodoForm from "./components/TodoForm";
import TaskList from "./components/TaskList";

export default function App() {
  const [todos, setTodos] = useState<Task[]>([]);
  const [done, setDone] = useState<Task[]>([]);

  const addTodo = (text: string) => setTodos((p) => [...p, { id: Date.now(), text }]);
  const completeTask = (task: Task) => {
    setTodos((p) => p.filter((t) => t.id !== task.id));
    setDone((p) => [task, ...p]);
  };
  const deleteTask = (task: Task) => setDone((p) => p.filter((t) => t.id !== task.id));

  return (
    <div className="todo-container">
      <h1 className="todo-container__header">YONG TODO</h1>
      <TodoForm onAdd={addTodo} />
      <div className="render-container">
        <TaskList title="할 일" tasks={todos} actionLabel="완료" onItemClick={completeTask} />
        <TaskList title="완료" tasks={done} actionLabel="삭제" onItemClick={deleteTask} />
      </div>
    </div>
  );
}
