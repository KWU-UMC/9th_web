// src/components/TodoList.tsx
import React from 'react';
import { useTodos } from '../context/TodoContext';
import TodoItem from './TodoItem';

const TodoList: React.FC = () => {
  const { todos, completeTask } = useTodos();

  return (
    <div className="render-container__section">
      <h2 className="render-container__title">할 일</h2>
      <ul id="todo-list" className="render-container__list">
        {todos.map(task => (
          <TodoItem
            key={task.id}
            task={task}
            isDone={false}
            onActionButtonClick={completeTask}
          />
        ))}
      </ul>
    </div>
  );
};

export default TodoList;