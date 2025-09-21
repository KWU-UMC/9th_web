const todoForm = document.getElementById('todo-form') as HTMLInputElement;
const todoInput = document.getElementById('todo-input') as HTMLFormElement;
const todoList = document.getElementById('todo-list') as HTMLUListElement;
const doneList = document.getElementById('done-list') as HTMLUListElement;

type Todo ={
  id: number;
  text: string;
};

let todos: Todo[] = [];
let dones: Todo[] = [];

function renderTodos():void{
  todoList.innerHTML = '';
  doneList.innerHTML = '';

  todos.forEach((todo): void =>{
    const li = createItem(todo, false);
    todoList.appendChild(li);
  });

  dones.forEach((done): void =>{
    const li = createItem(done, true);
    doneList.appendChild(li);
  })
};

function getInputText():string{
  return todoInput.value.trim();
};

function addTodo(text: string):void{
  todos.push({id: Date.now(), text: text});
  todoInput.value = '';
  renderTodos();
};

function completeTodo(comTodo: Todo): void{
  todos = todos.filter((todo):boolean => todo.id !== comTodo.id);
  dones.push(comTodo);
  renderTodos();
}

function removeTodo(remTodo: Todo): void{
  dones = dones.filter((done):boolean => done.id !== remTodo.id);
  renderTodos();
};

function createItem(todo: Todo, isDone: boolean):HTMLElement {
  const li = document.createElement('li');
  li.classList.add('main-container__item');
  li.textContent = todo.text;
  
  const btn = document.createElement('button');
  btn.classList.add('main-container__item-button');

  if(isDone){
    btn.textContent = '삭제';
  } else{
    btn.textContent = '완료';
  }

  btn.addEventListener('click', ():void => {
    if(isDone){
      removeTodo(todo);
    } else{
      completeTodo(todo);
    }
  });

  li.appendChild(btn);
  return li;
};

todoForm.addEventListener('submit', (e:Event):void => {
  e.preventDefault()
  const text = getInputText();

  if (text) {
    addTodo(text);
  }
});

renderTodos();