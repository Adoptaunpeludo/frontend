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
  AboutUsPage,
  AdopterProfile,
  AnimalDetailsPage,
  AnimalForm,
  AnimalsPage,
  AppLayout,
  ErrorPage,
  ForgotPasswordPage,
  LandingPage,
  LoginPage,
  NotificationsPage,
  RegisterPage,
  ResetPasswordPage,
  ShelterDetailsPage,
  ShelterProfile,
  SheltersPage,
  VerifyEmailPage,
} from './pages/index.js';

// Actions
import { action as forgotPasswordAction } from './pages/Auth/ForgotPassword/action.js';
import { action as loginAction } from './pages/Auth/Login/action.js';
import { action as registerAction } from './pages/Auth/Register/action.js';
import { action as resetPasswordAction } from './pages/Auth/ResetPassword/action.js';
import { action as verifyEmailAction } from './pages/Auth/VerifyEmail/action.js';
import { action as adopterProfileAction } from './pages/Private/Adopters/AdopterProfile/action.js';
import { action as mutateAnimalAction } from './pages/Private/Shelters/AnimalForm/action.js';
import { action as shelterProfileAction } from './pages/Private/Shelters/ShelterProfile/action.js';

// Loaders
import { loader as verifyEmailLoader } from './pages/Auth/VerifyEmail/loader.js';
import { loader as userFavsLoader } from './pages/Private/Adopters/AdopterProfile/loader.js';
import { loader as updateAnimalLoader } from './pages/Private/Shelters/AnimalForm/loader.js';
import { loader as userAnimalsLoader } from './pages/Private/Shelters/ShelterProfile/loader.js';
import { loader as animalDetailsLoader } from './pages/Public/Animals/AnimalDetails/loader.js';
import { loader as animalsLoader } from './pages/Public/Animals/loader.js';
import { loader as landingAnimalsLoader } from './pages/Public/Landing/loader.js';
import { loader as shelterDetailsLoader } from './pages/Public/Shelters/ShelterDetails/loader.js';
import { loader as sheltersLoader } from './pages/Public/Shelters/loader.js';
// import { loader as resetPasswordLoader } from './pages/Auth/ResetPassword/ResetPasswordPage.jsx';
import { loader as userDataLoader } from './pages/Layout/loader.js';
import { loader as assistantChatLoader } from './pages/Private/Assistant/loader.js';
import { loader as currentChatLoader } from './pages/Private/Chat/loader.js';

import { useAnimalImagesContext } from './context/AnimalImagesContext.jsx';
import { useModalContext } from './context/ModalContext.jsx';
import NotFoundPage from './pages/Error/NotFound/NotFoundPage.jsx';
import AssistantPage from './pages/Private/Assistant/AssistantPage.jsx';
import AdoptionChatPage from './pages/Private/Chat/AdoptionChatPage.jsx';
import ProtectedRoute from './pages/Private/ProtectedRoute.jsx';
import { ErrorsProvider } from './context/FormErrorsContext.jsx';

export const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      staleTime: 1000 * 60 * 15,
    },
  },
});

const router = (
  bioModalOnClose,
  shelterModalOnClose,
  updatePasswordModalOnClose,
  animalImages
) =>
  createBrowserRouter([
    {
      path: '/',
      element: <AppLayout />,
      errorElement: <ErrorPage />,
      loader: userDataLoader(queryClient),
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
          element: <VerifyEmailPage />,
          loader: verifyEmailLoader,
          action: verifyEmailAction,
        },
        {
          path: 'forgot-password',
          element: <ForgotPasswordPage />,
          action: forgotPasswordAction,
        },
        {
          path: '/reset-password/:token',
          element: <ResetPasswordPage />,
          //loader: resetPasswordLoader,
          action: resetPasswordAction,
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
          path: 'shelters/:username',
          element: <ShelterDetailsPage />,
          loader: shelterDetailsLoader(queryClient),
        },
        {
          path: 'animals/:shelterName',
          element: <AnimalsPage page={'shelters'} />,
          loader: animalsLoader(queryClient, 'shelters'),
        },
        {
          path: 'animals/cats',
          element: <AnimalsPage page={'cats'} />,
          loader: animalsLoader(queryClient, 'cats'),
        },
        {
          path: 'animals/cats/:slug',
          element: <AnimalDetailsPage />,
          loader: animalDetailsLoader(queryClient),
        },
        {
          path: 'animals/dogs',
          element: <AnimalsPage page={'dogs'} />,
          loader: animalsLoader(queryClient, 'dogs'),
        },
        {
          path: 'animals/dogs/:slug',
          element: <AnimalDetailsPage />,
          loader: animalDetailsLoader(queryClient),
        },
        {
          path: 'about',
          element: <AboutUsPage />,
        },

        //* End Public Routes
        //* Private Routes
        {
          path: 'private',
          element: <ProtectedRoute />,
          errorElement: <ErrorPage />,
          children: [
            {
              path: 'assistant',
              element: <AssistantPage />,
              loader: assistantChatLoader(queryClient),
            },
            {
              path: 'adopter/:username',
              element: <AdopterProfile />,
              loader: userFavsLoader(queryClient),
              action: adopterProfileAction(
                bioModalOnClose,
                updatePasswordModalOnClose,
                queryClient
              ),
            },
            {
              path: 'shelter/:username',
              element: <ShelterProfile />,
              loader: userAnimalsLoader(queryClient),
              action: shelterProfileAction(
                bioModalOnClose,
                shelterModalOnClose,
                updatePasswordModalOnClose,
                queryClient
              ),
            },
            {
              path: 'shelter/update-animal/:slug',
              element: <AnimalForm />,
              action: mutateAnimalAction(animalImages, queryClient),
              loader: updateAnimalLoader(queryClient),
            },
            {
              path: 'shelter/create-animal/',
              element: <AnimalForm />,
              action: mutateAnimalAction(animalImages, queryClient),
            },
            {
              path: 'notifications',
              element: <NotificationsPage />,
              //action: mutateAnimalAction(animalImages, queryClient),
              //loader: updateAnimalLoader(queryClient),
            },
            {
              path: 'chat/:chat',
              element: <AdoptionChatPage />,
              loader: currentChatLoader(queryClient),
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
  const { bioModal, shelterModal, updatePasswordModal } = useModalContext();

  return (
    <QueryClientProvider client={queryClient}>
      <ReactQueryDevtools initialIsOpen={false} />
      <ErrorsProvider>
        <RouterProvider
          router={router(
            bioModal.onClose,
            shelterModal.onClose,
            updatePasswordModal.onClose,
            animalImages
          )}
        />
      </ErrorsProvider>
    </QueryClientProvider>
  );
}

export default App;
