import { useState } from 'react'
import './App.css'

function App() {
  const [count, setCount] = useState(0)

  function increase(): void{
    setCount(count+1);
  };

  function decrease(): void{
    setCount(count-1);
  }

  return (
    <>
      <h1>{count}</h1>
      <button onClick={() => increase()}>+1</button>
      <button onClick={() => decrease()}>-1</button>
    </>
  )
}

export default App
