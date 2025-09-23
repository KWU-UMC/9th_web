// HTML 문서에서 특정 태그를 가져와서 조작하기 위함
var input = document.querySelector(".todo-container__input");
var todoForm = document.querySelector(".todo-container__form");
var todoList = document.querySelector(".todoList");
var clearList = document.querySelector(".clearList");
var todos = [];
var clears = [];
var renderTask = function () {
    todoList.innerHTML = "";
    clearList.innerHTML = "";
    todos.forEach(function (todo) {
        var li = createTodoElement(todo, false);
        todoList.appendChild(li);
    });
    clears.forEach(function (todo) {
        var li = createTodoElement(todo, true);
        clearList.appendChild(li);
    });
};
var getTodoText = function () {
    return input.value.trim();
};
var addTodo = function (todoText) {
    todos.push({ id: Date.now(), text: todoText });
    input.value = "";
    renderTask();
};
// 완료 처리 함수
var completeTodo = function (todo) {
    todos = todos.filter(function (t) { return t.id !== todo.id; });
    clears.push(todo);
    renderTask();
};
// 삭제 처리 함수
var deleteTodo = function (todo) {
    clears = clears.filter(function (t) { return t.id !== todo.id; });
    renderTask();
};
var createTodoElement = function (todo, isDone) {
    // li 태그 생성
    var li = document.createElement("li");
    li.classList.add("listItem");
    // button 태그 생성
    var button = document.createElement("button");
    button.textContent = isDone ? "삭제" : "완료";
    // button에 클릭 이벤트 리스너 등록
    button.addEventListener("click", function () {
        isDone ? deleteTodo(todo) : completeTodo(todo);
    });
    li.append(todo.text, button);
    return li;
};
todoForm.addEventListener("submit", function (event) {
    event.preventDefault();
    var todoText = getTodoText();
    if (todoText) {
        addTodo(todoText);
    }
});
renderTask();
