// src/App.tsx
import React from 'react';
import TodoForm from './components/TodoForm';
import TodoList from './components/TodoList';
import DoneList from './components/DoneList';
import './App.css';

// TodoItem에서 여전히 이 타입을 사용하므로 남겨두거나, 별도 파일로 분리해도 좋습니다.
export type Task = {
  id: number;
  text: string;
};

function App() {
  return (
    <div className="todo-container">
      <h1 className="todo-container__header">YONG TODO</h1>
      <TodoForm />
      <div className="render-container">
        <TodoList />
        <DoneList />
      </div>
    </div>
  );
}

export default App;