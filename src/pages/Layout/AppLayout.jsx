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
import { useEffect } from 'react';

export const loader = (queryClient) => async () => {
  let isLoggedIn = sessionStorage.getItem('isLoggedIn');
  isLoggedIn = isLoggedIn === null ? null : isLoggedIn === 'true';

  console.log({ isLoggedIn });

  if (isLoggedIn === false) return { user: null, notifications: null };

  if (isLoggedIn === null || isLoggedIn)
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

  useEffect(() => {
    sessionStorage.setItem('isLoggedIn', user ? true : false);
  }, [user]);

  return (
    <>
      <NextUIProvider navigate={navigate}>
        <div className="min-h-screen flex flex-col">
          <WebSocketContextProvider user={user}>
            <Header user={user} notifications={notifications?.notifications} />
            <Outlet context={{ user, notifications }} />
            <Footer />
          </WebSocketContextProvider>
        </div>
        <ScrollRestoration />
      </NextUIProvider>
    </>
  );
};

export default AppLayout;
