import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { RouterProvider, createBrowserRouter } from 'react-router-dom';
import {
  AppLayout,
  ErrorPage,
  LandingPage,
  LoginPage,
  RegisterPage,
} from './pages';
import { ReactQueryDevtools } from '@tanstack/react-query-devtools';

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      staleTime: 60 * 60 * 15,
    },
  },
});

const router = createBrowserRouter([
  {
    path: '/',
    element: <AppLayout />,
    errorElement: <ErrorPage />,
    children: [
      {
        index: true,
        element: <LandingPage />,
      },
      {
        path: 'register',
        element: <RegisterPage />,
        // action:
      },
      {
        path: 'login',
        element: <LoginPage />,
        // action:
      },
      // {
      //   path: "dasboardh"
      //   ...
      // }
    ],
  },
]);

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <ReactQueryDevtools initialIsOpen={false} />
      <RouterProvider router={router} />
    </QueryClientProvider>
  );
}

export default App;
