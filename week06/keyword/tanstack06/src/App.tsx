import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
import { WelcomeData } from './components/UserDataDisplay'
import InfinitePostsJsonPlaceholder from './components/InfinitePostsJsonPlaceholder';
import InfinitePostsAutoJsonPlaceholder from './components/InfinitePostsAutoJsonPlaceholder';

const queryClient = new QueryClient();

const App = () => {
  return (
    <QueryClientProvider client={queryClient}>
      <InfinitePostsAutoJsonPlaceholder />
      {/* <InfinitePostsJsonPlaceholder /> */}
      {/* <WelcomeData /> */}
    </QueryClientProvider>
  )
}

export default App
