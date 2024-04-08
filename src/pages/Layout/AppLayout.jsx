import { NextUIProvider } from '@nextui-org/react';
import { useQueryClient } from '@tanstack/react-query';
import { useEffect } from 'react';
import { Outlet, ScrollRestoration, useNavigate } from 'react-router-dom';
import { useWebSocketContext } from '../../context/WebSocketContext';
import { useUserChats, userChatsQuery } from '../Private/Shelters/useUserChats';
import {
  useNotifications,
  userNotificationsQuery,
} from '../Private/useNotifications';
import { useUser, userQuery } from '../Private/useUser';
import Footer from './Footer';
import Header from './Header';
import { toast } from 'react-toastify';

export const loader = (queryClient) => async () => {
  const isLoggedIn = localStorage.getItem('isLoggedIn') === 'true';

  if (!isLoggedIn) return { notifications: null, user: null, chats: null };

  try {
    const user = await queryClient.ensureQueryData(userQuery);
    const notifications = await queryClient.ensureQueryData(
      userNotificationsQuery
    );
    const chats = await queryClient.ensureQueryData(
      userChatsQuery(user.username)
    );
    return { notifications, user, chats };
  } catch (error) {
    return { user: null, notifications: null };
  }
};

const AppLayout = () => {
  const navigate = useNavigate();
  const { data: user } = useUser();
  const { data: notifications } = useNotifications();
  const { data: chats } = useUserChats(user?.username);
  const { send, isReady, val } = useWebSocketContext();
  const queryClient = useQueryClient();

  useEffect(() => {
    if (isReady)
      send(
        JSON.stringify({
          type: 'user-login',
          token: user?.wsToken,
          username: user?.username,
        })
      );
  }, [isReady, user, send]);

  useEffect(() => {
    let timer = setTimeout(() => {
      if (isReady && user) {
        toast.dismiss();
        return;
      }
      if (!isReady && user) {
        toast.info(
          'No ha sido posible conectar al servidor de chat/notificaciones.',
          {
            draggable: false,
            closeOnClick: false,
            autoClose: false,
            hideProgressBar: true,
            style: { marginTop: '50px' },
          }
        );
      }
    }, 3000);

    return () => clearTimeout(timer); // Limpiar el temporizador en caso de que el componente se desmonte antes de que se cumplan los 5 segundos
  }, [isReady, user]);

  useEffect(() => {
    if (val && isReady) {
      const message = JSON.parse(val);
      const { type, ...data } = message;

      switch (type) {
        case 'animal-created-deleted':
          queryClient.invalidateQueries({
            queryKey: ['animals'],
          });
          queryClient.invalidateQueries({
            queryKey: ['shelter-animals', data.createdBy],
          });
          break;
        case 'animal-changed-push-notification':
          queryClient.invalidateQueries({
            queryKey: ['animals'],
          });
          queryClient.invalidateQueries({
            queryKey: ['animal-details', data.data.animalSlug],
          });
          queryClient.invalidateQueries({
            queryKey: ['shelters-animals', data.createdBy],
          });
          queryClient.invalidateQueries({
            queryKey: ['user-notifications'],
          });
          break;
        case 'chat-message-notification':
          queryClient.invalidateQueries({
            queryKey: ['user-notifications'],
          });
          break;
        case 'new-chat-push-notification':
          queryClient.invalidateQueries({
            queryKey: ['user-chats', data.username],
          });
          queryClient.invalidateQueries({
            queryKey: ['user-notifications'],
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
          queryClient.invalidateQueries({
            queryKey: ['shelters-animals', message.username],
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
          queryClient.invalidateQueries({
            queryKey: ['shelters-animals', message.username],
          });
          break;
      }
    }
  }, [isReady, val, queryClient]);

  useEffect(() => {
    localStorage.setItem('isLoggedIn', user ? true : false);
  }, [user]);

  return (
    <>
      <NextUIProvider navigate={navigate}>
        <div className="min-h-screen flex flex-col">
          <Header />
          <Outlet context={{ user, notifications, chats }} />
          <Footer />
        </div>
        <ScrollRestoration />
      </NextUIProvider>
    </>
  );
};

export default AppLayout;
