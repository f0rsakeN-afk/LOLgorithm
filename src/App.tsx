import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
import { ReactQueryDevtools } from '@tanstack/react-query-devtools'
import Layout from './pages/Layout';
import { ThemeProvider } from './providers/theme-provider';

const App = () => {
  const queryClient = new QueryClient();
  return <>
    <QueryClientProvider client={queryClient}>
      <ThemeProvider defaultTheme='system' storageKey='lolgorithm-theme'>

        <Layout>
          k xa kta kti ho

        </Layout>
      </ThemeProvider>
      <ReactQueryDevtools initialIsOpen={false} />
    </QueryClientProvider>

  </>
};

export default App;
