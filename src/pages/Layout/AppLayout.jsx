import { NextUIProvider } from '@nextui-org/react';
import { Outlet, ScrollRestoration, useNavigate } from 'react-router-dom';
import Footer from './Footer';
import Header from './Header';
import { useUser, userQuery } from '../Private/useUser';
import {
  useNotifications,
  userNotificationsQuery,
} from '../Private/useNotifications';
import { useWebSocketContext } from '../../context/WebSocketContext';
import { useEffect } from 'react';
import { useQueryClient } from '@tanstack/react-query';
import { useNotificationsContext } from '../../context/NotificationsContext';

export const loader = (queryClient) => async () => {
  const isLoggedIn = localStorage.getItem('isLoggedIn') === 'true';
  if (!isLoggedIn) return { user: null, notifications: null };

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
  const { data: user } = useUser();
  const { data: notifications } = useNotifications();
  const { send, isReady, val } = useWebSocketContext();
  const queryClient = useQueryClient();
  const { setNotifications } = useNotificationsContext();

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
    if (val && isReady) {
      const message = JSON.parse(val);
      const { type, ...data } = message;
      switch (type) {
        // case 'chat-created':
        //   queryClient.invalidateQueries({
        //     queryKey: ['user-chats', data.shelterUsername],
        //   });
        //   break;
        case 'animal-changed-push-notification':
          queryClient.invalidateQueries({
            queryKey: ['animals'],
          });
          queryClient.invalidateQueries({
            queryKey: ['animal-details', data.animalSlug],
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
  }, [isReady, val, queryClient, setNotifications]);

  useEffect(() => {
    localStorage.setItem('isLoggedIn', user ? true : false);
  }, [user]);

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
