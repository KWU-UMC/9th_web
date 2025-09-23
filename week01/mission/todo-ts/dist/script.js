"use strict";
const todoInput = document.getElementById("todo-input");
const todoForm = document.getElementById("todo-form");
const todoList = document.getElementById("todo-list");
const doneList = document.getElementById("done-list");
let todos = [];
let dones = [];
const renderTodo = () => {
    todoList.innerHTML = "";
    doneList.innerHTML = "";
    todos.forEach((todo) => {
        todoList.appendChild(createTodoElement(todo, false));
    });
    dones.forEach((done) => {
        doneList.appendChild(createTodoElement(done, true));
    });
};
const getInput = () => {
    return todoInput.value.trim();
};
const addTodo = () => {
    if (!getInput())
        return;
    todos.push({
        id: todos.length + 1,
        text: getInput(),
    });
    renderTodo();
};
const completeTodo = (todo) => {
    todos = todos.filter((t) => t.id !== todo.id);
    console.log(todos);
    dones.push(todo);
    renderTodo();
};
const deleteTodo = (done) => {
    dones = dones.filter((t) => t.id !== done.id);
    renderTodo();
};
const createTodoElement = (todo, isDone) => {
    const li = document.createElement("li");
    li.classList.add("todo-renderer__item");
    li.textContent = todo.text;
    const button = document.createElement("button");
    button.classList.add("todo-renderer__item-button");
    if (isDone) {
        button.textContent = "삭제";
        button.style.backgroundColor = "red";
        button.addEventListener("click", () => deleteTodo(todo));
    }
    else {
        button.textContent = "완료";
        button.addEventListener("click", () => completeTodo(todo));
    }
    li.appendChild(button);
    return li;
};
todoForm.addEventListener("submit", (e) => {
    e.preventDefault();
    addTodo();
    todoInput.value = "";
});
renderTodo();
