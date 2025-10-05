import "./App.css";
import TodoForm from "./components/TodoForm";
import TodoList from "./components/TodoList";

function App() {
  return (
    <>
      <div className="todo-container">
        <h1 className="todo-container__header">TODO</h1>
        <TodoForm />
        <div className="render-container">
          <TodoList type="todo" title="할 일" />
          <TodoList type="done" title="할 일" />
        </div>
      </div>
    </>
  );
}

export default App;
