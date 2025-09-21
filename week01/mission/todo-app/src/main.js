// src/main.ts
// 1. HTML 요소들을 가져옵니다.
var taskInput = document.getElementById('taskInput');
var addTaskBtn = document.getElementById('addTaskBtn');
var todoList = document.getElementById('todoList');
var completedList = document.getElementById('completedList');
// 2. 할 일 목록을 저장할 배열을 만듭니다.
var todos = [];
var completed = [];
// 3. UI를 다시 그리는 함수를 만듭니다.
function renderLists() {
    // 할 일 목록 UI 업데이트
    todoList.innerHTML = ''; // 기존 목록 초기화
    todos.forEach(function (task) {
        var li = document.createElement('li');
        li.className = 'todo-item';
        li.innerHTML = "\n            <span>".concat(task, "</span>\n            <div class=\"todo-item__buttons\">\n                <button class=\"todo-item__button--complete\">\uC644\uB8CC</button>\n            </div>\n        ");
        todoList.appendChild(li);
        // '완료' 버튼에 이벤트 리스너 추가
        var completeBtn = li.querySelector('.todo-item__button--complete');
        completeBtn.addEventListener('click', function () {
            completeTask(task);
        });
    });
    // 완료 목록 UI 업데이트
    completedList.innerHTML = ''; // 기존 목록 초기화
    completed.forEach(function (task) {
        var li = document.createElement('li');
        li.className = 'todo-item todo-item--completed';
        li.innerHTML = "\n            <span>".concat(task, "</span>\n            <div class=\"todo-item__buttons\">\n                <button class=\"todo-item__button--delete\">\uC0AD\uC81C</button>\n            </div>\n        ");
        completedList.appendChild(li);
        // '삭제' 버튼에 이벤트 리스너 추가
        var deleteBtn = li.querySelector('.todo-item__button--delete');
        deleteBtn.addEventListener('click', function () {
            deleteTask(task);
        });
    });
}
// 4. 할 일 추가 로직
addTaskBtn.addEventListener('click', function () {
    var taskText = taskInput.value.trim();
    if (taskText !== '') {
        todos.push(taskText);
        taskInput.value = ''; // 입력창 비우기
        renderLists();
    }
});
// 5. 할 일 완료 로직
function completeTask(task) {
    // todos 배열에서 해당 할 일을 찾아 제거
    todos = todos.filter(function (t) { return t !== task; });
    // completed 배열에 해당 할 일 추가
    completed.push(task);
    renderLists();
}
// 6. 할 일 삭제 로직
function deleteTask(task) {
    // completed 배열에서 해당 할 일을 찾아 제거
    completed = completed.filter(function (t) { return t !== task; });
    renderLists();
}
// 초기 화면 렌더링
renderLists();
