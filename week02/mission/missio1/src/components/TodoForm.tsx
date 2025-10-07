import React, { useState, type FormEvent } from "react";
import { useTodo } from "../context/TodoContext";



const TodoForm = () : Element => {
        const [input, setInput]= useState<string>('');
        const { addTodo } = useTodo();

        const handleSubmit = (e : FormEvent<HTMLFormElement>) : void => {
            e.preventDefault();
            const text = input.trim();
    
            if (text) {
                addTodo(text);
                setInput('');
            };
        };
    

    return (         
        <form  onSubmit={handleSubmit}
         className="todo-container__form">
            <input type="text" 
            value ={input}
            onChange={(e) : void => setInput(e.target.value)}
            className="todo-container__input"
            placeholder="할 일 입력"
            required></input>
            <button type="submit" className="todo-container__button">
                할 일 추가
            </button>
        </form>
        );
};

export default TodoForm;