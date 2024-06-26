import { NextUIProvider } from '@nextui-org/react';
import { useQueryClient } from '@tanstack/react-query';
import { useEffect } from 'react';
import { Outlet, ScrollRestoration, useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';

import { useWebSocketContext } from '../../context/WebSocketContext';
import { useUser } from '../Private/useUser';

import Footer from './Footer';
import Header from './Header';

const AppLayout = () => {
  const navigate = useNavigate();
  const { data: user } = useUser();
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
        case 'user-joined-room':
          data.action === 'read-messages' &&
            queryClient.invalidateQueries({
              queryKey: ['user-chats', data.username],
            });

          data.action === 'double-check' &&
            queryClient.invalidateQueries({
              queryKey: ['chat-history', data.room],
            });
          break;
        case 'user-changed':
          if (data.action === 'user-deleted')
            queryClient.invalidateQueries({
              queryKey: ['animals'],
            });
          queryClient.invalidateQueries({
            queryKey: ['shelters'],
          });
          queryClient.invalidateQueries({
            queryKey: ['shelter-details', data.username],
          });
          queryClient.invalidateQueries({
            queryKey: ['user-chats'],
          });
          break;
        case 'animal-changed':
          queryClient.invalidateQueries({
            queryKey: ['animals'],
          });
          queryClient.invalidateQueries({
            queryKey: ['shelter-animals', data.createdBy],
          });
          queryClient.removeQueries({
            queryKey: ['animal-details', data.slug],
          });
          queryClient.invalidateQueries({
            queryKey: ['user-chats'],
          });
          break;
        case 'animal-changed-push-notification':
          queryClient.invalidateQueries({
            queryKey: ['user-notifications'],
          });
          break;
        case 'chat-message-notification':
          queryClient.invalidateQueries({
            queryKey: ['user-notifications'],
          });
          break;
        case 'unread-chat-message':
          queryClient.invalidateQueries({
            queryKey: ['user-chats', data.receiver],
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
        case 'user-online-status-changed':
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
    localStorage.setItem('isFirstLoad', false);
    localStorage.setItem('isLoggedIn', user ? true : false);
  }, [user]);

  return (
    <>
      <NextUIProvider navigate={navigate}>
        <div className="min-h-screen flex flex-col">
          <Header />
          <Outlet />
          <Footer />
        </div>
        <ScrollRestoration />
      </NextUIProvider>
    </>
  );
};

export default AppLayout;
