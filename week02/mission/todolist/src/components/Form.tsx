import { useState } from "react";
import { useTodo } from "../context/TodoProvider";
import clsx from "clsx";

const Form = () => {
  const { setTodoList, isDark, toggleDarkMode } = useTodo();
  const [input, setInput] = useState('');

  function handleSubmit(e: React.FormEvent<HTMLFormElement>): void{
    e.preventDefault();
    addTodo(input);
    setInput('');
  }

  function addTodo(textInput: string): void{
    const newText = textInput.trim();

    if (newText){
      setTodoList(prev => [...prev, {id: Date.now(), text: newText} ]);
    }
  };

  return (
    <form onSubmit={handleSubmit} className='todo-container__form'>
      <input 
        type="text"
        className={clsx(
          'todo-container__input',
          isDark ? 'bg-white' : ''
        )}
        value={input}
        onChange={(e) => setInput(e.target.value)}
        placeholder='할 일 입력'
        required
      />
      <button type='submit' className='todo-container__button'>할 일 추가</button>
      <button type="button" className="todo-container__button" onClick={toggleDarkMode}>
        {isDark ? 'light': 'dark'}
      </button>
    </form>
  )
}

export default Form
