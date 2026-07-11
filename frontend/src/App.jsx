import './App.css';

import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { Route, Routes } from 'react-router-dom';

import SigninCardContainer from '@/components/organism/Auth/SigninCardContainer';
import SignupCardContainer from '@/components/organism/Auth/SignupCardContainer';
import { Toaster } from '@/components/ui/sonner';
import { Auth } from '@/pages/Auth/Auth.jsx';
import NotFound from '@/pages/NotFound/NotFound';

const queryClient = new QueryClient();

function App() {
  return (
    <>
      <QueryClientProvider client={queryClient}>

        <Routes>
          <Route path="/" element={<div>Home Page go to /auth</div>}></Route>
          <Route path="/auth/signup" element={<Auth><SignupCardContainer /></Auth>}></Route>
          <Route path="/auth/signin" element={<Auth><SigninCardContainer /></Auth>}></Route>

          <Route path='/*' element={<NotFound></NotFound>} />
        </Routes>

        <Toaster position="top-center"></Toaster>

      </QueryClientProvider>
    </>
  );
}

export default App;
