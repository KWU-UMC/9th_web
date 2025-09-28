import TodoForm from "./TodoForm";
import TodoList from "./TodoList";
import { useTodo } from "../context/TodoContext";

const Todo = () => {
    const {todos, donetodos, handleComplete, handleDelete} = useTodo();

    return (
        <>
            <h1 className='todo-container__header'>[TO-DO LIST]</h1>
            <div className = 'todo-container'>
                <TodoForm />
                <div className="todo-container__render">
                    <TodoList
                        title='할 일'
                        todos={todos}
                        buttonLabel='완료'
                        backgroundColor= 'rgba(12, 49, 105, 1)'
                        color='white'
                        cursor='pointer'
                        borderRadius='5px'
                        padding='4px 8px'
                        onClick={handleComplete}
                    />
                    <TodoList
                        title='완료'
                        todos={donetodos}
                        buttonLabel='삭제'
                        backgroundColor='rgba(6, 21, 53, 1)'
                        color='white'
                        cursor='pointer'
                        borderRadius='5px'
                        padding='4px 8px'
                        onClick={handleDelete}
                    />
                </div>
            </div>
        </>
    )
}

export default Todo;

