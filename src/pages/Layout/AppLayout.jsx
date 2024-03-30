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

  useEffect(() => {
    if (isReady && userInformation)
      socket.send(
        JSON.stringify({
          type: 'user-authentication',
          token: user?.wsToken,
        })
      );
  }, [isReady, user, socket]);

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
