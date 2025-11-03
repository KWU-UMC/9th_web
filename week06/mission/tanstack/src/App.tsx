import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
import { WelcomeData } from './components/UserDataDisplay'


const queryClient = new QueryClient();

const App = () => {
  return (
    <QueryClientProvider client={queryClient}>
      <WelcomeData />
    </QueryClientProvider>
  )
}

export default App