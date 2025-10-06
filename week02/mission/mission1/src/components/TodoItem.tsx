// src/components/TodoItem.tsx
import React from 'react';
import type  { Task } from '../App'; // App.tsx에서 Task 타입을 가져옵니다.

interface TodoItemProps {
  task: Task;
  isDone: boolean;
  onActionButtonClick: (id: number) => void;
}

const TodoItem: React.FC<TodoItemProps> = ({ task, isDone, onActionButtonClick }) => {
  const buttonText = isDone ? '삭제' : '완료';
  const buttonBgColor = isDone ? '#dc3545' : '#28a745';

  return (
    <li className="render-container__item">
      <span className="render-container__item-text">{task.text}</span>
      <button
        className="render-container__item-button"
        style={{ backgroundColor: buttonBgColor }}
        onClick={() => onActionButtonClick(task.id)}
      >
        {buttonText}
      </button>
    </li>
  );
};

export default TodoItem;