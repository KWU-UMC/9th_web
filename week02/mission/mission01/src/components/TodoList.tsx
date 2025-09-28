import type { TTodo } from "../types/todo";

interface TodoListProps {
    title: string;
    todos: TTodo[];
    buttonLabel: string;
    backgroundColor: string;
    color: string;
    cursor: string;
    borderRadius: string;
    padding: string;
    onClick: (todo:TTodo)=>void;
}

const TodoList = ({title, todos, buttonLabel, backgroundColor, color, cursor, borderRadius, padding, onClick, }:TodoListProps) => {
    return (
        <div className="todo-container__render_section">
        <h4 className="todo-container__render_title">{title}</h4>
        <ul id="todo-list" className="todo-container__render_list">
            {todos.map((todo)=>(
                <li key={todo.id} className="todo-container__render_item">
                <p className="todo-container__render_item_text">
                    {todo.text}
                </p>
                <button onClick={()=>onClick(todo)}
                    style={{
                        backgroundColor : backgroundColor,
                        color: color,
                        cursor: cursor,
                        borderRadius: borderRadius,
                        padding: padding,
                    }} 
                    className="todo-container__render_item_button">{buttonLabel}</button>
                </li>
            ))}
        </ul>
        </div>
    )
}

export default TodoList;