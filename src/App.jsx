import { QueryClientProvider } from '@tanstack/react-query';
import { ReactQueryDevtools } from '@tanstack/react-query-devtools';
import 'react-toastify/dist/ReactToastify.css';
import './index.css';
import { RouterProvider, createBrowserRouter } from 'react-router-dom';
import {
  AppLayout,
  CatsPage,
  DogsPage,
  ErrorPage,
  LandingPage,
  LoginPage,
  RegisterPage,
  SheltersPage,
  AnimalDetailsPage
} from './pages/index.js';
import { QueryClient } from '@tanstack/react-query';

import { loader as catsLoader } from './pages/Cats/CatsPage.jsx';

export const queryClient = new QueryClient({
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
        loader: catsLoader(queryClient),
      },
      {
        path: 'dogs',
        element: <DogsPage />,
      },
      {
        path: 'shelters',
        element: <SheltersPage />,
      },
      //! TODO: Change static redirection
      {
        path: 'animal-details',
        element: <AnimalDetailsPage />,
      },
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
