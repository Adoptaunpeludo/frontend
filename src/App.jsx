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
  ShelterDetailsPage,
  ShelterProfile,
  SheltersPage,
  VerifyEmail,
} from './pages/index.js';

import { action as loginAction } from './pages/Auth/Login/LoginPage.jsx';
import { action as registerAction } from './pages/Auth/Register/RegisterPage.jsx';
import { action as shelterProfileAction } from './pages/Private/Shelters/ShelterProfile/ShelterProfile.jsx';
import { action as adopterProfileAction } from './pages/Private/Adopters/AdopterProfile/AdopterProfile.jsx';
import { action as mutateAnimalAction } from './pages/Private/Shelters/AnimalForm/AnimalForm.jsx';
import { action as verifyEmailAction } from './pages/Auth/VerifyEmail/VerifyEmailPage.jsx';

import { loader as updateAnimalLoader } from './pages/Private/Shelters/AnimalForm/AnimalForm.jsx';
import { loader as animalDetailsLoader } from './pages/Public/Animals/AnimalDetails/AnimalDetailsPage.jsx';
import { loader as animalsLoader } from './pages/Public/Animals/AnimalsPage.jsx';
import { loader as landingAnimalsLoader } from './pages/Public/Landing/LandingPage.jsx';
import { loader as shelterDetailsLoader } from './pages/Public/Shelters/ShelterDetails/ShelterDetailsPage.jsx';
import { loader as userAnimalsLoader } from './pages/Private/Shelters/ShelterProfile/ShelterProfile.jsx';
import { loader as userFavsLoader } from './pages/Private/Adopters/AdopterProfile/AdopterProfile.jsx';
import { loader as sheltersLoader } from './pages/Public/Shelters/SheltersPage.jsx';
import { loader as verifyEmailLoader } from './pages/Auth/VerifyEmail/VerifyEmailPage.jsx';
import { loader as userDataLoader } from './pages/Layout/AppLayout.jsx';
import { loader as assistantChatLoader } from './pages/Private/Assistant/AssistantPage.jsx';
import { loader as currentChatLoader } from './pages/Private/Chat/AdoptionChatPage.jsx';

import { useAnimalImagesContext } from './context/AnimalImagesContext.jsx';
import NotFoundPage from './pages/Error/NotFound/NotFoundPage.jsx';
import ProtectedRoute from './pages/Private/ProtectedRoute.jsx';
import { useModalContext } from './context/ModalContext.jsx';
import AssistantPage from './pages/Private/Assistant/AssistantPage.jsx';
import AdoptionChatPage from './pages/Private/Chat/AdoptionChatPage.jsx';
import { useWebSocketContext } from './context/WebSocketContext.jsx';
import { useEffect } from 'react';
import { useNotificationsContext } from './context/NotificationsContext.jsx';

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
          element: <VerifyEmail />,
          loader: verifyEmailLoader,
          action: verifyEmailAction,
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
          errorElement: <ErrorPage />,
          children: [
            {
              path: 'assistant',
              element: <AssistantPage />,
              loader: assistantChatLoader(queryClient),
            },
            {
              path: 'adopter',
              element: <AdopterProfile />,
              loader: userFavsLoader(queryClient),
              action: adopterProfileAction(bioModalOnClose, queryClient),
            },
            {
              path: 'shelter/:username',
              element: <ShelterProfile />,
              loader: userAnimalsLoader(queryClient),
              action: shelterProfileAction(
                bioModalOnClose,
                shelterModalOnClose,
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
              path: 'shelter/create-animal',
              element: <AnimalForm />,
              action: mutateAnimalAction(animalImages, queryClient),
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
  const { bioModal, shelterModal } = useModalContext();
  const { socket, isReady } = useWebSocketContext();
  const { setNotifications } = useNotificationsContext();

  useEffect(() => {
    if (socket && isReady) {
      socket.onmessage = (event) => {
        const message = JSON.parse(event.data);
        const { type, ...data } = message;
        switch (type) {
          // case 'pong':
          //   clearInterval(pingInterval);
          //   break;
          // case 'chat-message':
          //   if (data.room === room)
          //     setChatMessages((prev) => [
          //       ...prev,
          //       { text: data.message, isSender: false },
          //     ]);
          //   break;
          case 'chat-created':
            queryClient.invalidateQueries({
              queryKey: ['user-chats', data.shelterUsername],
            });
            break;
          case 'animal-changed':
            setNotifications((notifications) => [...notifications, data]);
            queryClient.invalidateQueries({
              queryKey: ['animals'],
            });
            queryClient.invalidateQueries({
              queryKey: ['animal-details', data.animalSlug],
            });
            break;
          case 'user-connected':
            queryClient.invalidateQueries({
              queryKey: ['shelters'],
            });
            queryClient.invalidateQueries({
              queryKey: ['shelter-details', message.username],
            });
            queryClient.invalidateQueries({
              queryKey: ['animals'],
            });
            queryClient.invalidateQueries({
              queryKey: ['animal-details'],
            });
            break;
          case 'user-disconnected':
            queryClient.invalidateQueries({
              queryKey: ['shelters'],
            });
            queryClient.invalidateQueries({
              queryKey: ['shelter-details', message.username],
            });
            queryClient.invalidateQueries({
              queryKey: ['animals'],
            });
            queryClient.invalidateQueries({
              queryKey: ['animal-details'],
            });
            break;
        }
      };
    }
  }, [isReady, setNotifications, socket]);

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
