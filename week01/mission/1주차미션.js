document.addEventListener("DOMContentLoaded", () => {
  const inputField = document.querySelector(".todo__input-field");
  const addBtn = document.querySelector(".todo__input-btn");
  const todoList = document.getElementById("todo-list");
  const completedList = document.getElementById("completed-list");

  // 할 일 추가
  addBtn.addEventListener("click", () => {
    const text = inputField.value.trim();
    if (text === "") return;

    const li = createTodoItem(text);
    todoList.appendChild(li);
    inputField.value = "";
  });

  // 할 일 아이템 생성 함수
  function createTodoItem(text) {
    const li = document.createElement("li");
    li.className = "todo__item";

    const span = document.createElement("span");
    span.textContent = text;

    const doneBtn = document.createElement("button");
    doneBtn.textContent = "완료";
    doneBtn.className = "todo__item-btn todo__item-btn--done";
    doneBtn.addEventListener("click", () => {
      completedList.appendChild(li);
      doneBtn.remove();
    });

    const deleteBtn = document.createElement("button");
    deleteBtn.textContent = "삭제";
    deleteBtn.className = "todo__item-btn todo__item-btn--delete";
    deleteBtn.addEventListener("click", () => {
      li.remove();
    });

    li.appendChild(span);
    li.appendChild(doneBtn);
    li.appendChild(deleteBtn);

    return li;
  }
});
