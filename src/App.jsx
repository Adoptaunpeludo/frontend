import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { ReactQueryDevtools } from '@tanstack/react-query-devtools';
import { useState } from 'react';
import { RouterProvider, createBrowserRouter } from 'react-router-dom';
import {
  AppLayout,
  ErrorPage,
  LandingPage,
  LoginPage,
  RegisterPage
} from './pages';

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      staleTime: 60 * 60 * 15
    }
  }
});

const router = createBrowserRouter([
  {
    path: '/',
    element: <AppLayout />,
    errorElement: <ErrorPage />,
    children: [
      {
        index: true,
        element: <LandingPage />
      },
      {
        path: 'register',
        element: <RegisterPage />
        // action:
      },
      {
        path: 'login',
        element: <LoginPage />
        // action:
      }
      // {
      //   path: "dashboard"
      //   ...
      // }
    ]
  }
]);

function App() {
  const [count, setCount] = useState(0);

  return (
    <QueryClientProvider client={queryClient}>
      <ReactQueryDevtools initialIsOpen={false} />
      <RouterProvider router={router} />
    </QueryClientProvider>
  );
}

export default App;
