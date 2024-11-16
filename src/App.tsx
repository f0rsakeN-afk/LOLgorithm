import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
import { ReactQueryDevtools } from '@tanstack/react-query-devtools'
import { ThemeProvider } from './providers/theme-provider';
import Layout from './pages/Layout';
import Chat from './components/Chat';

const App = () => {
  const queryClient = new QueryClient({
    defaultOptions: {
      queries: {
        staleTime: Infinity,
        refetchOnWindowFocus: false
      }
    }
  });
  return <>
    <QueryClientProvider client={queryClient}>
      <ThemeProvider defaultTheme='system' storageKey='lolgorithm-theme'>
        <Layout>
          <Chat />
        </Layout>
      </ThemeProvider>
      <ReactQueryDevtools initialIsOpen={false} />
    </QueryClientProvider>

  </>
};

export default App;
