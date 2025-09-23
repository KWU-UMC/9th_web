const form = document.querySelector(".todo-container__form") as HTMLFormElement;
const input = document.querySelector(
  ".todo-container__input"
) as HTMLInputElement;
const todoList = document.querySelector("#todo-list") as HTMLUListElement;
const completedList = document.querySelector(
  "#completed-list"
) as HTMLUListElement;

// 새 할 일 항목을 생성하는 함수
function createTodoItem(taskText: string): HTMLLIElement {
  const li = document.createElement("li");

  const span = document.createElement("span");
  span.textContent = taskText;

  const completeBtn = document.createElement("button");
  completeBtn.className = "complete-button action-button";
  completeBtn.type = "button";
  completeBtn.textContent = "완료";
  completeBtn.addEventListener("click", () => completeTask(li, taskText));

  li.append(span, completeBtn);
  return li;
}

// 완료된 할 일 목록으로 이동하는 함수
function completeTask(item: HTMLLIElement, taskText: string) {
  item.remove();

  const completedItem = document.createElement("li");
  const span = document.createElement("span");
  span.textContent = taskText;

  const deleteBtn = document.createElement("button");
  deleteBtn.className = "delete-button action-button";
  deleteBtn.type = "button";
  deleteBtn.textContent = "삭제";
  deleteBtn.addEventListener("click", () => deleteTask(completedItem));

  completedItem.append(span, deleteBtn);
  completedList.appendChild(completedItem);
}

// 할 일을 목록에서 삭제하는 함수
function deleteTask(item: HTMLLIElement) {
  item.remove();
}

// 폼 제출 이벤트 리스너
form.addEventListener("submit", (e) => {
  e.preventDefault(); // 페이지 새로고침 방지

  const taskText = input.value.trim();

  if (taskText !== "") {
    const newItem = createTodoItem(taskText);
    todoList.appendChild(newItem);
    input.value = ""; // 입력 필드 초기화
  }
});
