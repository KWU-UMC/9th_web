// src/components/DoneList.tsx
import React from 'react';
import { useTodos } from '../context/TodoContext';
import TodoItem from './TodoItem';

const DoneList: React.FC = () => {
  const { doneTasks, deleteTask } = useTodos();

  return (
    <div className="render-container__section">
      <h2 className="render-container__title">완료</h2>
      <ul id="done-list" className="render-container__list">
        {doneTasks.map(task => (
          <TodoItem
            key={task.id}
            task={task}
            isDone={true}
            onActionButtonClick={deleteTask}
          />
        ))}
      </ul>
    </div>
  );
};

export default DoneList;