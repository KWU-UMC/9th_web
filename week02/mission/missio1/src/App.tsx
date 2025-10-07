import './App.css'

import Todo from "./components/Todo"
import { TodoProvider } from './context/TodoContext'

function App() {


  return (
    <div>
      <TodoProvider>
       <Todo />
      </TodoProvider>
    </div>
  )
}

export default App
