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
import { action as shelterProfileAction } from './pages/Private/Shelters/ShelterProfile/ShelterProfile.jsx';

import { loader as animalDetailsLoader } from './pages/Public/Animals/AnimalDetails/AnimalDetailsPage.jsx';
import { loader as animalsLoader } from './pages/Public/Animals/AnimalsPage.jsx';
import { loader as landingAnimalsLoader } from './pages/Public/Landing/LandingPage.jsx';
import { loader as currentUserLoader } from './pages/Private/ProtectedRoute.jsx';
import { loader as userAnimalsLoader } from './pages/Private/Shelters/loader.js';
import { loader as sheltersLoader } from './pages/Public/Shelters/SheltersPage.jsx';

import { useAnimalImagesContext } from './context/AnimalImagesContext.jsx';
import NotFoundPage from './pages/Error/NotFound/NotFoundPage.jsx';
import ProtectedRoute from './pages/Private/ProtectedRoute.jsx';

export const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      staleTime: 1000 * 60 * 15,
    },
  },
});

const router = (onClose, animalImages, resetImages) =>
  createBrowserRouter([
    {
      path: '/',
      element: <AppLayout />,
      errorElement: <ErrorPage />,
      children: [
        //* Auth Routes
        {
          path: 'register',
          element: <RegisterPage />,
          action: registerAction,
        },
        {
          path: 'login',
          element: <LoginPage />,
          action: loginAction(queryClient),
        },
        {
          path: 'users/verify-email',
          element: <VerifyEmail />,
        },
        //* End Auth Routes
        //* Public Routes
        {
          index: true,
          element: <LandingPage />,
          loader: landingAnimalsLoader(queryClient),
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
        {
          path: 'shelters',
          element: <SheltersPage page={'shelter'} />,
          loader: sheltersLoader(queryClient, 'shelters'),
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
        //* End Public Routes
        //* Private Routes
        {
          path: 'private',
          element: <ProtectedRoute />,
          loader: currentUserLoader(queryClient),
          children: [
            {
              path: 'adopter',
              //for test only
              element: <AdopterProfile />,
            },
            {
              path: 'shelter',
              //for test only
              element: <ShelterProfile />,
              loader: userAnimalsLoader(queryClient),
              action: shelterProfileAction(
                animalImages,
                resetImages,
                queryClient
              ),
            },
          ],
        },
        //* End Private Routes

        //* Not Found Routes
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
  const { images: animalImages, resetImages } = useAnimalImagesContext();

  return (
    <QueryClientProvider client={queryClient}>
      <ReactQueryDevtools initialIsOpen={false} />
      <RouterProvider router={router(animalImages, resetImages)} />
    </QueryClientProvider>
  );
}

export default App;
