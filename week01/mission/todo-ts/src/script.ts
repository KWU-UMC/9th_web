const todoInput = document.getElementById("todo-input") as HTMLInputElement;
const todoForm = document.getElementById("todo-form") as HTMLFormElement;
const todoList = document.getElementById("todo-list") as HTMLUListElement;
const doneList = document.getElementById("done-list") as HTMLUListElement;

interface TodoItem {
  id: number;
  text: string;
}

let todos: TodoItem[] = [];
let dones: TodoItem[] = [];

/* functions */
// 랜더링 함수
const renderTodo = () => {
  todoList.innerHTML = "";
  doneList.innerHTML = "";

  todos.forEach((todo): void => {
    todoList.appendChild(createTodoElement(todo, false));
  });
  dones.forEach((done): void => {
    doneList.appendChild(createTodoElement(done, true));
  });
};

// 인풋 함수
const getInput = (): string => {
  return todoInput.value.trim();
};

// todo 추가함수
const addTodo = () => {
  if (!getInput()) return;
  todos.push({
    id: todos.length + 1,
    text: getInput(),
  });
  renderTodo();
};

// todo 완료 함수
const completeTodo = (todo: TodoItem) => {
  todos = todos.filter((t): boolean => t.id !== todo.id);
  console.log(todos);
  dones.push(todo);
  renderTodo();
};

// done 제거 함수
const deleteTodo = (done: TodoItem) => {
  dones = dones.filter((t): boolean => t.id !== done.id);
  renderTodo();
};

// 아이템 생성 함수
const createTodoElement = (todo: TodoItem, isDone: boolean): HTMLLIElement => {
  const li = document.createElement("li");
  li.classList.add("todo-renderer__item");
  li.textContent = todo.text;
  const button = document.createElement("button");
  button.classList.add("todo-renderer__item-button");
  if (isDone) {
    button.textContent = "삭제";
    button.style.backgroundColor = "red";
    button.addEventListener("click", () => deleteTodo(todo));
  } else {
    button.textContent = "완료";
    button.addEventListener("click", () => completeTodo(todo));
  }
  li.appendChild(button);
  return li;
};

/* event listenrs*/
// 인풋 폼 제출
todoForm.addEventListener("submit", (e) => {
  e.preventDefault();
  addTodo();
  todoInput.value = "";
});

/* 초기화 */
renderTodo();
