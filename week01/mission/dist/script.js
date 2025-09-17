"use strict";
const todoForm = document.getElementById('todo-form');
const todoInput = document.getElementById('todo-input');
const todoList = document.getElementById('todo-list');
const doneList = document.getElementById('done-list');
let todos = [];
let dones = [];
function renderTodos() {
    todoList.innerHTML = '';
    doneList.innerHTML = '';
    todos.forEach((todo) => {
        const li = createItem(todo, false);
        todoList.appendChild(li);
    });
    dones.forEach((done) => {
        const li = createItem(done, true);
        doneList.appendChild(li);
    });
}
;
function getInputText() {
    return todoInput.value.trim();
}
;
function addTodo(text) {
    todos.push({ id: Date.now(), text: text });
    todoInput.value = '';
    renderTodos();
}
;
function completeTodo(comTodo) {
    todos = todos.filter((todo) => todo.id !== comTodo.id);
    dones.push(comTodo);
    renderTodos();
}
function removeTodo(remTodo) {
    dones = dones.filter((done) => done.id !== remTodo.id);
    renderTodos();
}
;
function createItem(todo, isDone) {
    const li = document.createElement('li');
    li.classList.add('main-container__item');
    li.textContent = todo.text;
    const btn = document.createElement('button');
    btn.classList.add('main-container__item-button');
    if (isDone) {
        btn.textContent = '삭제';
    }
    else {
        btn.textContent = '완료';
    }
    btn.addEventListener('click', () => {
        if (isDone) {
            removeTodo(todo);
        }
        else {
            completeTodo(todo);
        }
    });
    li.appendChild(btn);
    return li;
}
;
todoForm.addEventListener('submit', (e) => {
    e.preventDefault();
    const text = getInputText();
    if (text) {
        addTodo(text);
    }
});
renderTodos();
