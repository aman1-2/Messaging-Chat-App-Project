import './App.css';

import { QueryClient, QueryClientProvider } from '@tanstack/react-query';

import { Toaster } from '@/components/ui/sonner';
import AppContextProvider from '@/context/AppContextProvider';
import AppRoutes from '@/Routes';

const queryClient = new QueryClient();

function App() {
  return (
    <>
      <QueryClientProvider client={queryClient}>

        <AppContextProvider>
          <AppRoutes></AppRoutes>
        </AppContextProvider>

        <Toaster position="top-center"></Toaster>

      </QueryClientProvider>
    </>
  );
}

export default App;
