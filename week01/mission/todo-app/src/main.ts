// src/main.ts

// 1. HTML 요소들을 가져옵니다.
const taskInput = document.getElementById('taskInput') as HTMLInputElement;
const addTaskBtn = document.getElementById('addTaskBtn') as HTMLButtonElement;
const todoList = document.getElementById('todoList') as HTMLUListElement;
const completedList = document.getElementById('completedList') as HTMLUListElement;

// 2. 할 일 목록을 저장할 배열을 만듭니다.
let todos: string[] = [];
let completed: string[] = [];

// 3. UI를 다시 그리는 함수를 만듭니다.
function renderLists() {
    // 할 일 목록 UI 업데이트
    todoList.innerHTML = ''; // 기존 목록 초기화
    todos.forEach((task) => {
        const li = document.createElement('li');
        li.className = 'todo-item';
        li.innerHTML = `
            <span>${task}</span>
            <div class="todo-item__buttons">
                <button class="todo-item__button--complete">완료</button>
            </div>
        `;
        todoList.appendChild(li);

        // '완료' 버튼에 이벤트 리스너 추가
        const completeBtn = li.querySelector('.todo-item__button--complete') as HTMLButtonElement;
        completeBtn.addEventListener('click', () => {
            completeTask(task);
        });
    });

    // 완료 목록 UI 업데이트
    completedList.innerHTML = ''; // 기존 목록 초기화
    completed.forEach((task) => {
        const li = document.createElement('li');
        li.className = 'todo-item todo-item--completed';
        li.innerHTML = `
            <span>${task}</span>
            <div class="todo-item__buttons">
                <button class="todo-item__button--delete">삭제</button>
            </div>
        `;
        completedList.appendChild(li);

        // '삭제' 버튼에 이벤트 리스너 추가
        const deleteBtn = li.querySelector('.todo-item__button--delete') as HTMLButtonElement;
        deleteBtn.addEventListener('click', () => {
            deleteTask(task);
        });
    });
}

// 4. 할 일 추가 로직
addTaskBtn.addEventListener('click', () => {
    const taskText = taskInput.value.trim();
    if (taskText !== '') {
        todos.push(taskText);
        taskInput.value = ''; // 입력창 비우기
        renderLists();
    }
});

// 5. 할 일 완료 로직
function completeTask(task: string) {
    // todos 배열에서 해당 할 일을 찾아 제거
    todos = todos.filter(t => t !== task);
    // completed 배열에 해당 할 일 추가
    completed.push(task);
    renderLists();
}

// 6. 할 일 삭제 로직
function deleteTask(task: string) {
    // completed 배열에서 해당 할 일을 찾아 제거
    completed = completed.filter(t => t !== task);
    renderLists();
}

// 초기 화면 렌더링
renderLists();