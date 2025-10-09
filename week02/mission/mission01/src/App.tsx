import "./App.css";
import TodoForm from "./components/TodoForm";
import TodoList from "./components/TodoList";

export default function App() {
  return (
    <div className="page">
      <div className="todo-container">
        <h1 className="todo-container__header">YONG TODO</h1>
        <TodoForm />
        <div className="render-container">
          <TodoList title="할 일" mode="todo" />
          <TodoList title="완료" mode="done" />
        </div>
      </div>
    </div>
  );
}
