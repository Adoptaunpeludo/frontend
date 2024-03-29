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
import { WebSocketContextProvider } from '../../context/WebSocketContext';
import { NotificationsContextProvider } from '../../context/NotificationsContext';
import { AdoptionChatContextProvider } from '../../context/AdoptionChatContext';

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

  return (
    <>
      <NextUIProvider navigate={navigate}>
        <div className="min-h-screen flex flex-col">
          <AdoptionChatContextProvider>
            <NotificationsContextProvider>
              <WebSocketContextProvider user={user}>
                <Header />
                <Outlet context={{ user, notifications }} />
                <Footer />
              </WebSocketContextProvider>
            </NotificationsContextProvider>
          </AdoptionChatContextProvider>
        </div>
        <ScrollRestoration />
      </NextUIProvider>
    </>
  );
};

export default AppLayout;
