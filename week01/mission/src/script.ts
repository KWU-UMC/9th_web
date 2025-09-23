//해야할 일 정리: input이 입력 됐을 때, form에 이벤트 발생 시 form 요소 제출, list들 받아와서 item 넣기/삭제
//to-do가 어떤 식으로 구성될 지부터 생각해보기

// 1. HTML 요소 선택
// 2. 할 일이 어떻게 생긴 애인지 Type 정의
// - 할 일 목록 렌더링 하는 함수 정의
// 3. 할 일 텍스트 입력 처리 함수
// 4. 할 일 추가 처리 함수
// 5. 할 일 상태 변경 (완료로 이동)
// 6. 완료된 할 일 삭제 함수
// 7. 할 일 item 생성 함수(완료 여부에 따라 버튼 텍스트나 색상이 달라짐)
// 8. form 제출 이벤트 리스너

// 1. HTML 요소 선택
const todoInput=document.getElementById('todo-input') as HTMLInputElement; //as로 해두면 type 안전성 확보되게 만들기 가능
const todoForm=document.getElementById('todo-form') as HTMLFormElement;
const todoList=document.getElementById('todo-list') as HTMLUListElement;
const doneList=document.getElementById('done-list') as HTMLUListElement;

// 2. 할 일이 어떻게 생긴 애인지 Type 정의
type Todo={
    id:number;
    text:string;
};

let todos:Todo[]=[];
let doneTasks:Todo[]=[];

// - 할 일 목록 렌더링 하는 함수 정의
const renderTasks = (): void => {
    todoList.innerHTML=''; //빈요소로
    doneList.innerHTML='';

    todos.forEach((todo:Todo) : void =>{
        const li=createTodoElement(todo,false);
        todoList.appendChild(li);
    });

    doneTasks.forEach((todo:Todo):void =>{
        const li=createTodoElement(todo,true);
        doneList.appendChild(li);
    })
}

// 3. 할 일 텍스트 입력 처리 함수 (공백 자르기)
const getTodoText=():string =>{
    return todoInput.value.trim();
}

// 4. 할 일 추가 처리 함수
const addTodoText=(text:string):void =>{
    todos.push({id:todos.length+1,text:text});
    todoInput.value=''; //값 받았으면 지워줘야됨
    renderTasks();
}
// 5. 할 일 상태 변경 (완료로 이동)
const compleTodo=(todo:Todo):void=>{
    todos=todos.filter((t):boolean =>t.id!==todo.id);
    doneTasks.push(todo);
    renderTasks();
}

// 6. 완료된 할 일 삭제 함수
const deleteTodo=(todo:Todo):void=>{
    doneTasks=doneTasks.filter((t):boolean=>t.id!==todo.id);
    renderTasks();
}

// 7. 할 일 item 생성 함수(완료 여부에 따라 버튼 텍스트나 색상이 달라짐)
/* 아래 부분을 만들 예정
<li class="todo-container__render_item">
    <p class="todo-container__render_item_text">123</p>
    <button class="todo-container__render_item_button">삭제</button>
</li>
*/
const createTodoElement = (todo:Todo, isDone:boolean) : HTMLElement=>{
    const li=document.createElement('li'); //list 생성
    li.classList.add('todo-container__render_item');
    li.textContent=todo.text;
    
    const button=document.createElement('button');
    button.classList.add('todo-container__render_item_button');
    if(isDone){
        button.textContent='삭제';
        button.style.backgroundColor='rgba(6, 21, 53, 1)';
        button.style.color='white';
        button.style.cursor='pointer';
        button.style.borderRadius='5px';
        button.style.padding = "6px 8px";
        button.style.padding = "4px 8px";
    }
    else{
        button.textContent='완료';
        button.style.backgroundColor='rgba(12, 49, 105, 1)';
        button.style.color='white';
        button.style.cursor='pointer';
        button.style.borderRadius='5px';
        button.style.padding = "4px 8px";
    }

    button.addEventListener('click',() :void => {
        if(isDone){
            deleteTodo(todo);
        }
        else{
            compleTodo(todo);
        }
    });

    li.appendChild(button); //button 넣어주기
    return li;
}

// 8. form 제출 이벤트 리스너
todoForm.addEventListener('submit',(event:Event):void=>{
    event.preventDefault(); //초기화 방지
    const text=getTodoText(); //입력 받으면 공백 자르기
    if(text){
        addTodoText(text);
    }
});

renderTasks();