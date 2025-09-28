import { useState, type FormEvent } from "react";
import { useTodo } from "../context/TodoContext";

const TodoForm = () => {

    const [input,setInput]=useState<string>('');
    const {handleAdd} = useTodo();

    const handleSubmit = (e:FormEvent<HTMLFormElement>):void => {
        e.preventDefault(); //새로고침 방지
        const text=input.trim(); //띄어쓰기 잘라내기

        if(text){
            handleAdd(text);
            setInput('');
        }
    }
    
    return (    
        <form onSubmit={handleSubmit} className = 'todo-container__form' id='todo-form'>
            <h4 className = 'todo-container__form_title'>할 일 추가하기</h4>
            <div className = 'todo-container__form_button'>
            <input
                value={input}
                onChange={(e)=>setInput(e.target.value)}
                type="text"
                id="todo-input"
                className="todo-container__form_input"
                required
                />
            <button type="submit" className="todo-container__form_submit">추가</button>
            </div>
        </form>
    )
}

export default TodoForm;