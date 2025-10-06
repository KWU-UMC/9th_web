// src/components/TodoForm.tsx
import React from 'react';
import { useTodos } from '../context/TodoContext';

const TodoForm: React.FC = () => {
  const [input, setInput] = React.useState('');
  const { addTodo } = useTodos(); // Context에서 함수를 직접 가져옵니다.

  const handleSubmit = (event: React.FormEvent) => {
    event.preventDefault();
    addTodo(input);
    setInput('');
  };

  return (
    <form className="todo-container__form" onSubmit={handleSubmit}>
      <input
        type="text"
        className="todo-container__input"
        placeholder="할 일 입력"
        value={input}
        onChange={(e) => setInput(e.target.value)}
        required
      />
      <button type="submit" className="todo-container__button">할 일 추가</button>
    </form>
  );
};

export default TodoForm;