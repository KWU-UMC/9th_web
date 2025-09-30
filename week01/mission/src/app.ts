import {TTodo} from "./types/Todo";

// HTML 문서에서 특정 태그를 가져와서 조작하기 위함
const input = document.querySelector(".todo-container__input") as HTMLInputElement;
const todoForm = document.querySelector(".todo-container__form") as HTMLFormElement;  
const todoList = document.querySelector(".todoList") as HTMLUListElement;
const clearList = document.querySelector(".clearList") as HTMLUListElement;

let todos: TTodo[] = [];
let clears: TTodo[] = [];

const renderTask = ():void => {
    todoList.innerHTML = "";
    clearList.innerHTML = "";

    todos.forEach((todo):void => {
        const li = createTodoElement(todo, false);
        todoList.appendChild(li);
    });

    clears.forEach((todo):void => {
        const li = createTodoElement(todo, true);
        clearList.appendChild(li);
    }); 
}

const getTodoText = ():string => {
    return input.value.trim();
}

const addTodo = (todoText:string):void => {
    todos.push({id: Date.now(), text: todoText});
    input.value = "";
    renderTask();
}

// 완료 처리 함수
const completeTodo = (todo: TTodo):void => {
    todos = todos.filter(t => t.id !== todo.id);
    clears.push(todo);
    renderTask();  
}

// 삭제 처리 함수
const deleteTodo = (todo:TTodo):void => {
    clears = clears.filter(t => t.id !== todo.id);
    renderTask();
}

const createTodoElement = (todo:TTodo, isDone: boolean): HTMLElement => {
    // li 태그 생성
    const li = document.createElement("li");
    li.classList.add("listItem");

    // button 태그 생성
    const button = document.createElement("button");
    button.textContent = isDone ? "삭제" : "완료";

    // button에 클릭 이벤트 리스너 등록
    button.addEventListener("click", () => {
        isDone ? deleteTodo(todo) : completeTodo(todo);
    });

    li.append(todo.text, button)
    return li;
}

todoForm.addEventListener("submit", (event):void => {
    event.preventDefault();
    const todoText = getTodoText();
    if (todoText) {
        addTodo(todoText);
    }
});

renderTask();
