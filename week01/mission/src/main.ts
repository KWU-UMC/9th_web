type TodoId = string;

interface Todo {
  id: TodoId;
  text: string;
}

const $ = <T extends HTMLElement>(selector: string) =>
  document.querySelector(selector) as T;

const form = $("#todoForm") as HTMLFormElement;
const input = $("#todoInput") as HTMLInputElement;
const todoList = $("#todoList") as HTMLUListElement;
const doneList = $("#doneList") as HTMLUListElement;

function createTodoItem(text: string, listType: "todo" | "done"): HTMLLIElement {
  const li = document.createElement("li");
  li.className = "todo-item";
  li.dataset.type = listType;

  const span = document.createElement("span");
  span.className = "todo-item__text";
  span.textContent = text;

  const actions = document.createElement("div");
  actions.className = "todo-item__actions";

  if (listType === "todo") {
    const doneBtn = document.createElement("button");
    doneBtn.className = "btn btn--ok";
    doneBtn.type = "button";
    doneBtn.textContent = "완료";
    doneBtn.setAttribute("data-action", "done");
    actions.appendChild(doneBtn);
  } else {
    const deleteBtn = document.createElement("button");
    deleteBtn.className = "btn btn--danger";
    deleteBtn.type = "button";
    deleteBtn.textContent = "삭제";
    deleteBtn.setAttribute("data-action", "delete");
    actions.appendChild(deleteBtn);
  }

  li.append(span, actions);
  return li;
}

form.addEventListener("submit", (e) => {
  e.preventDefault();
  const text = input.value.trim();
  if (!text) {
    input.focus();
    return;
  }
  const li = createTodoItem(text, "todo");
  todoList.appendChild(li);
  form.reset();
  input.focus();
});

function handleListClick(e: MouseEvent) {
  const target = e.target as HTMLElement;
  if (!(target instanceof HTMLButtonElement)) return;

  const action = target.dataset.action;
  if (!action) return;

  const li = target.closest("li");
  if (!(li instanceof HTMLLIElement)) return;

  if (action === "done") {
    const text = (li.querySelector(".todo-item__text") as HTMLSpanElement).textContent ?? "";
    const doneItem = createTodoItem(text, "done");
    doneList.appendChild(doneItem);
    li.remove();
  } else if (action === "delete") {
    li.remove();
  }
}

todoList.addEventListener("click", handleListClick);
doneList.addEventListener("click", handleListClick);
