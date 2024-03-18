import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { ReactQueryDevtools } from '@tanstack/react-query-devtools';
import {
  Navigate,
  RouterProvider,
  createBrowserRouter,
} from 'react-router-dom';
import 'react-toastify/dist/ReactToastify.css';
import './index.css';
import {
  AdopterProfile,
  AnimalDetailsPage,
  AnimalsPage,
  AppLayout,
  // CatsPage,
  // DogsPage,
  ErrorPage,
  LandingPage,
  LoginPage,
  RegisterPage,
  ShelterProfile,
  SheltersPage,
  VerifyEmail,
} from './pages/index.js';

import { action as loginAction } from './pages/Auth/Login/LoginPage.jsx';
import { action as registerAction } from './pages/Auth/Register/RegisterPage.jsx';
import { action as shelterProfileAction } from './pages/Private/ShelterProfile/ShelterProfile.jsx';

import { loader as animalDetailsLoader } from './pages/AnimalDetails/AnimalDetailsPage.jsx';
// import { loader as filterCatsLoader } from './pages/Cats/CatsPage.jsx';
// import { loader as filterDogsLoader } from './pages/Dogs/DogsPage.jsx';
import { loader as landingAnimalsLoader } from './pages/Landing/LandingPage.jsx';
import { loader as currentUserLoader } from './pages/Layout/AppLayout.jsx';
import { loader as animalsLoader } from './pages/Animals/AnimalsPage.jsx';
import { loader as userAnimalsLoader } from './pages/Private/loader.js';
import NotFoundPage from './pages/NotFound/NotFoundPage.jsx';

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
        loader: landingAnimalsLoader(queryClient),
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
        path: 'animals/cats',
        element: <AnimalsPage page={'cats'} />,
        loader: animalsLoader(queryClient, 'cats'),
      },
      {
        path: 'animals/dogs',
        element: <AnimalsPage page={'dogs'} />,
        loader: animalsLoader(queryClient, 'dogs'),
      },
      // {
      //   path: 'cats',
      //   element: <CatsPage />,
      //   loader: filterCatsLoader(queryClient),
      // },
      // {
      //   path: 'dogs',
      //   element: <DogsPage />,
      //   loader: filterDogsLoader(queryClient),
      // },
      {
        path: 'shelters',
        element: <SheltersPage />,
        // action:
      },
      {
        path: 'private/adopter',
        //for test only
        element: <AdopterProfile />,
      },
      {
        path: 'private/shelter',
        //for test only
        element: <ShelterProfile />,
        loader: userAnimalsLoader(queryClient),
        action: shelterProfileAction(queryClient),
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
      {
        path: '404',
        element: <NotFoundPage />,
      },
      {
        path: '*',
        element: <Navigate to="404" />,
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
