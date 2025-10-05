import './App.css'
import { ThemeProvider } from './context/ThemeProvider'
import ContextPage from './context/ContextPage'

function App() {

  return (
    <ThemeProvider>
      <ContextPage />
    </ThemeProvider>
  )
}

export default App