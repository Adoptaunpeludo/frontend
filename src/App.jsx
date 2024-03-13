import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { ReactQueryDevtools } from '@tanstack/react-query-devtools';
import { RouterProvider, createBrowserRouter } from 'react-router-dom';
import 'react-toastify/dist/ReactToastify.css';
import './index.css';
import {
  AnimalDetailsPage,
  AnimalForm,
  AppLayout,
  CatsPage,
  DogsPage,
  ErrorPage,
  LandingPage,
  LoginPage,
  RegisterPage,
  SheltersPage
} from './pages/index.js';

import { loader as animalDetailsLoader } from './pages/AnimalDetails/AnimalDetailsPage.jsx';
import { loader as catsLoader } from './pages/Cats/CatsPage.jsx';

export const queryClient = new QueryClient({
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
      },
      {
        path: 'cats',
        element: <CatsPage />,
        loader: catsLoader(queryClient)
      },
      {
        path: 'dogs',
        element: <DogsPage />
      },

      {
        path: 'shelters',
        element: <SheltersPage />
        // action:
      },
      {
        path: 'testPage',
        //for test only
        element: <AnimalForm />
      },
      {
        path: 'cats/:slug',
        element: <AnimalDetailsPage />,
        loader: animalDetailsLoader(queryClient)
      },
      {
        path: 'dogs/:slug',
        element: <AnimalDetailsPage />,
        loader: animalDetailsLoader(queryClient)
      }
    ]
  }
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
