import { useState, type FormEvent } from "react"
import type { TTodo } from "./types/todo" // 교안이랑 다르게 type으로 지정 안해주면 오류가 났음

const TodoBefore = ():Element => {
    const [todos, setTodos] =useState<TTodo[]>([]);
    const [doneTodos, setDoneTodos] =useState<TTodo[]>([]);
    const [input,setInput] = useState<string>('');

    const handleSubmit = (e: FormEvent<HTMLFormElement>): void => {
        e.preventDefault();
        const text = input.trim();

        if( text ){
            const newTodo:TTodo = { id: Date.now() ,text };   
            setTodos((prevTodos): TTodo[] => [...prevTodos , newTodo]);
            setInput (''); // setInput =(""); 식으로 대입 형태로 잘못 작성하면 함수 호출이 아니라 상수 수정 형태가 되어서 오류가 나고 입력창이 초기화 되지 않았음
        }
    };

    const CompleteTodo = (todo:TTodo):void => {
        setTodos((prevTodos: TTodo[]) => prevTodos.filter((t):boolean => t.id !== todo.id));
        setDoneTodos((prevDoneTodos):TTodo[] =>  [...prevDoneTodos, todo] );
    }

    
    const DeleteTodo = (todo:TTodo):void => {
        setDoneTodos((prevDoneTodos: TTodo[]) => prevDoneTodos.filter((t):boolean => t.id !== todo.id));
        }

    return (
        <div className="todo-container">
            <h1 className="todo-container__header">Dew Todo</h1>
            <form onSubmit={handleSubmit} className="todo-container__form">
                <input value={input} onChange={(e):void => setInput(e.target.value)} type='text' className="todo-container__input" placeholder="할일 입력" required></input>
                <button type="submit" className="todo-container__button">할 일 추가</button>
            </form>
            <div className="render-container">
                <div className="render-container__section">
                    <h2 className="render-container__title">할 일</h2>
                    <ul id="todo-list" className="render-container__list">
                        {todos.map((todo) => ( //Element로 설정해 놓으면 오류 나서 해당 부분 우선 삭제
                            <li key={todo.id} className="render-container__item">   
                            <span className="render-container__item-text">{todo.text}</span>
                            <button onClick={():void => CompleteTodo(todo)} style={{ // 버튼을 누르면 위에 미리 만들어놓은 함수 연결되도록 = > 이때 CompleteTodo는 todo를 파라미터로 받기 때문에 {Completetodo}라고만 적으면 에러가 남
                                backgroundColor:'#28a745',}}className="render-container__item-button">완료</button>
                            </li>
                    ))} 
                    </ul>
                </div>
                <div className="render-container__section">
                    <h2 className="render-container__title">삭제</h2>
                    <ul id="todo-list" className="render-container__list">
                        {doneTodos.map((todo) => (
                            <li key={todo.id} className="render-container__item">
                            <span className="render-container__item-text">{todo.text}</span>
                            <button onClick={():void => DeleteTodo(todo)} style={{
                                backgroundColor:'#dc3545',}}className="render-container__item-button">삭제</button>
                            </li>
                    ))} 
                    </ul>
                </div>
            </div>
        </div>
    )
}
export default TodoBefore