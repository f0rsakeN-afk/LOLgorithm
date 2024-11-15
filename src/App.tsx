import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
import { ReactQueryDevtools } from '@tanstack/react-query-devtools'

const App = () => {
  const queryClient = new QueryClient();
  return <>
    <QueryClientProvider client={queryClient}>
      app
      <ReactQueryDevtools initialIsOpen={false} />
    </QueryClientProvider>

  </>
};

export default App;
