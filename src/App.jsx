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
  AnimalForm,
  AnimalsPage,
  AppLayout,
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
import { action as mutateAnimalAction } from './pages/Private/Shelters/AnimalForm/AnimalForm.jsx';

import { loader as updateAnimalLoader } from './pages/Private/Shelters/AnimalForm/AnimalForm.jsx';
import { loader as animalDetailsLoader } from './pages/Public/Animals/AnimalDetails/AnimalDetailsPage.jsx';
import { loader as animalsLoader } from './pages/Public/Animals/AnimalsPage.jsx';
import { loader as landingAnimalsLoader } from './pages/Public/Landing/LandingPage.jsx';
import { loader as currentUserLoader } from './pages/Private/ProtectedRoute.jsx';
import { loader as userAnimalsLoader } from './pages/Private/Shelters/loader.js';
import { loader as verifyEmailLoader } from './pages/VerifyEmail/VerifyEmailPage.jsx';
import { loader as sheltersLoader } from './pages/Public/Shelters/SheltersPage.jsx';

import { useAnimalImagesContext } from './context/AnimalImagesContext.jsx';
import NotFoundPage from './pages/Error/NotFound/NotFoundPage.jsx';
import ProtectedRoute from './pages/Private/ProtectedRoute.jsx';
import { useModalContext } from './context/ModalContext.jsx';

export const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      staleTime: 1000 * 60 * 15,
    },
  },
});

const router = (bioModalOnClose, shelterModalOnClose, animalImages) =>
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
          path: '/verify-email/:token',
          element: <VerifyEmail />,
          loader: verifyEmailLoader,
        },
        //* End Auth Routes
        //* Public Routes
        {
          index: true,
          element: <LandingPage />,
          loader: landingAnimalsLoader(queryClient),
        },
        {
          path: 'shelters',
          element: <SheltersPage page={'shelter'} />,
          loader: sheltersLoader(queryClient, 'shelters'),
        },
        {
          path: 'animals/cats',
          element: <AnimalsPage page={'cats'} />,
          loader: animalsLoader(queryClient, 'cats'),
        },
        {
          path: '/animals/cats/:slug',
          element: <AnimalDetailsPage />,
          loader: animalDetailsLoader(queryClient),
        },
        {
          path: 'animals/dogs',
          element: <AnimalsPage page={'dogs'} />,
          loader: animalsLoader(queryClient, 'dogs'),
        },
        {
          path: '/animals/dogs/:slug',
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
                bioModalOnClose,
                shelterModalOnClose,
                queryClient
              ),
            },
            {
              path: 'shelter/create-animal',
              element: <AnimalForm />,
              action: mutateAnimalAction(animalImages, queryClient),
            },
            {
              path: 'shelter/update-animal/:slug',
              element: <AnimalForm />,
              action: mutateAnimalAction(animalImages, queryClient),
              loader: updateAnimalLoader(queryClient),
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
          element: <Navigate to="404" replace={true} />,
        },
      ],
    },
  ]);

function App() {
  const { images: animalImages } = useAnimalImagesContext();
  const { bioModal, shelterModal } = useModalContext();

  return (
    <QueryClientProvider client={queryClient}>
      <ReactQueryDevtools initialIsOpen={false} />
      <RouterProvider
        router={router(bioModal.onClose, shelterModal.onClose, animalImages)}
      />
    </QueryClientProvider>
  );
}

export default App;
