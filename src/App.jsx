import { NextUIProvider } from '@nextui-org/react';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { ReactQueryDevtools } from '@tanstack/react-query-devtools';
import { RouterProvider, createBrowserRouter } from 'react-router-dom';
import {
  AppLayout,
  ErrorPage,
  LandingPage,
  LoginPage,
  RegisterPage,
} from './pages';
import CatsPage from './pages/Cats/CatsPage';
import DogsPage from './pages/Dogs/DogsPage';
import SheltersPage from './pages/Shelters/SheltersPage';

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
      {
        path: 'cats',
        element: <CatsPage />,
      },
      {
        path: 'dogs',
        element: <DogsPage />,
      },
      {
        path: 'shelters',
        element: <SheltersPage />,
      },
    ],
  },
]);

function App() {
  return (
    <NextUIProvider>
      <QueryClientProvider client={queryClient}>
        <ReactQueryDevtools initialIsOpen={false} />
        <RouterProvider router={router} />
      </QueryClientProvider>
    </NextUIProvider>
  );
}

export default App;
