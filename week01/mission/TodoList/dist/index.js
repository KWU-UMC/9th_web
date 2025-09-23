"use strict";
const form = document.querySelector(".todo-container__form");
const input = document.querySelector(".todo-container__input");
const todoList = document.querySelector("#todo-list");
const completedList = document.querySelector("#completed-list");
function createTodoItem(taskText) {
    var _a;
    const li = document.createElement("li");
    li.innerHTML = `
        <span>${taskText}</span>
        <button class="action-button complete-button">완료</button>
    `;
    (_a = li.querySelector(".complete-button")) === null || _a === void 0 ? void 0 : _a.addEventListener("click", () => {
        completeTask(li, taskText);
    });
    return li;
}
function completeTask(item, taskText) {
    var _a;
    item.remove();
    const completedItem = document.createElement("li");
    completedItem.innerHTML = `
        <span>${taskText}</span>
        <button class="action-button delete-button">삭제</button>
    `;
    (_a = completedItem
        .querySelector(".delete-button")) === null || _a === void 0 ? void 0 : _a.addEventListener("click", () => {
        deleteTask(completedItem);
    });
    completedList.appendChild(completedItem);
}
function deleteTask(item) {
    item.remove();
}
form.addEventListener("submit", (e) => {
    e.preventDefault();
    const taskText = input.value.trim();
    if (taskText !== "") {
        const newItem = createTodoItem(taskText);
        todoList.appendChild(newItem);
        input.value = "";
    }
});
