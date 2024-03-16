import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { ReactQueryDevtools } from '@tanstack/react-query-devtools';
import { RouterProvider, createBrowserRouter } from 'react-router-dom';
import 'react-toastify/dist/ReactToastify.css';
import './index.css';
import {
  AnimalDetailsPage,
  AppLayout,
  CatsPage,
  DogsPage,
  ErrorPage,
  LandingPage,
  LoginPage,
  RegisterPage,
  SheltersPage,
  UserFormBio,
  VerifyEmail
} from './pages/index.js';

import { action as registerAction } from './pages/Auth/Register/RegisterPage.jsx';
import { action as loginAction } from './pages/Auth/Login/LoginPage.jsx';

import { loader as currentUserLoader } from './pages/Layout/AppLayout.jsx';
import { loader as animalDetailsLoader } from './pages/AnimalDetails/AnimalDetailsPage.jsx';
import { loader as animalsLoader } from './pages/Landing/LandingPage.jsx';
import { loader as filterCatsLoader } from './pages/Cats/CatsPage.jsx';
import { loader as filterDogsLoader } from './pages/Dogs/DogsPage.jsx';

export const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      staleTime: 1000 * 60 * 15,
    },
  },
});

const router = createBrowserRouter([
  {
    path: '/',
    element: <AppLayout />,
    errorElement: <ErrorPage />,
    loader: currentUserLoader(queryClient),
    children: [
      {
        index: true,
        element: <LandingPage />,
        loader: animalsLoader(queryClient),
      },
      {
        path: 'register',
        element: <RegisterPage />,
        action: registerAction,
      },
      {
        path: 'login',
        element: <LoginPage />,
        action: loginAction,
      },
      {
        path: 'cats',
        element: <CatsPage />,
        loader: filterCatsLoader(queryClient),
      },
      {
        path: 'dogs',
        element: <DogsPage />,
        loader: filterDogsLoader(queryClient),
      },
      {
        path: 'shelters',
        element: <SheltersPage />,
        // action:
      },
      {
        path: 'testPage',
        //for test only
        element: <UserFormBio />,
      },
      {
        path: 'cats/:slug',
        element: <AnimalDetailsPage />,
        loader: animalDetailsLoader(queryClient),
      },
      {
        path: 'dogs/:slug',
        element: <AnimalDetailsPage />,
        loader: animalDetailsLoader(queryClient),
      },
      {
        path: 'users/verify-email',
        element: <VerifyEmail />,
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
