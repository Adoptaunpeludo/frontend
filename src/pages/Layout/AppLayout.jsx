import { NextUIProvider } from '@nextui-org/react';
import {
  Outlet,
  ScrollRestoration,
  useLoaderData,
  useNavigate,
} from 'react-router-dom';
import Footer from './Footer';
import Header from './Header';
import { userQuery } from '../Private/useUser';
import { userNotificationsQuery } from '../Private/useNotifications';
import { useWebSocketContext } from '../../context/WebSocketContext';
import { useEffect } from 'react';
import { userInformation } from '../../utils/asideDataFields';
import { useQueryClient } from '@tanstack/react-query';
import { useNotificationsContext } from '../../context/NotificationsContext';

export const loader = (queryClient) => async () => {
  try {
    const [user, notifications] = await Promise.all([
      await queryClient.ensureQueryData(userQuery),
      await queryClient.ensureQueryData(userNotificationsQuery),
    ]);
    return { notifications, user };
  } catch (error) {
    return { user: null, notifications: null };
  }
};

const AppLayout = () => {
  const navigate = useNavigate();
  const { user, notifications } = useLoaderData();
  const { socket, isReady } = useWebSocketContext();
  const queryClient = useQueryClient();
  const { setNotifications } = useNotificationsContext();

  useEffect(() => {
    if (isReady && userInformation)
      socket.send(
        JSON.stringify({
          type: 'user-authentication',
          token: user?.wsToken,
        })
      );
  }, [isReady, user, socket]);

  useEffect(() => {
    console.log({ socket, isReady });
    if (socket && isReady) {
      socket.onmessage = (event) => {
        const message = JSON.parse(event.data);
        console.log({ message });
        const { type, ...data } = message;
        switch (type) {
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
  }, [socket, isReady]);

  return (
    <>
      <NextUIProvider navigate={navigate}>
        <div className="min-h-screen flex flex-col">
          <Header />
          <Outlet context={{ user, notifications }} />
          <Footer />
        </div>
        <ScrollRestoration />
      </NextUIProvider>
    </>
  );
};

export default AppLayout;
