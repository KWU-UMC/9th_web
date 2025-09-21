document.addEventListener('DOMContentLoaded', function(){
  input = document.getElementById("input");
  todo_list = document.getElementById("todo");
  done_list = document.getElementById("done");

  input.addEventListener('keydown', function(e){
    if(e.key === 'Enter'){
      const text = input.value.trim();
      if(text === '') {
        input.value = ''
        return;
      }
      addTodo(text);
    }
  })

  function addTodo(text){
    const li = document.createElement('li');
      li.appendChild(document.createTextNode(text));

      const button = document.createElement('button');
      button.textContent = '완료';

      button.addEventListener('click', () => {
        if(button.textContent === '완료'){
          completeTodo(li, button);
        }
        else{
          li.remove(li)
        }
      });

      li.appendChild(button);
      todo_list.appendChild(li);

      input.value = '';
  }

  function completeTodo(li, button){
    done_list.appendChild(li);
    button.textContent = '삭제';
  }

  function removeTodo(li){
    li.remove()
  }
});