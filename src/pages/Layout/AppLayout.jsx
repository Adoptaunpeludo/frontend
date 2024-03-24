import { NextUIProvider } from '@nextui-org/react';
import { Outlet, ScrollRestoration, useNavigate } from 'react-router-dom';
import Footer from './Footer';
import Header from './Header';
import { useUser } from '../Private/useUser';
import { useNotifications } from '../Private/useNotifications';
import { useAuthContext } from '../../context/AuthContext';
import { useEffect } from 'react';
import { WebSocketContextProvider } from '../../context/WebSocketContext';

const AppLayout = () => {
  const navigate = useNavigate();
  const { data: user } = useUser();
  const { data: notifications } = useNotifications();
  const { setIsLoggedIn } = useAuthContext();

  useEffect(() => {
    console.log({ user });
    sessionStorage.setItem('isLoggedIn', user !== undefined);
    const isLoggedIn =
      sessionStorage.getItem('isLoggedIn') === 'true' && user !== null;
    setIsLoggedIn(isLoggedIn);
  }, [setIsLoggedIn, user]);

  return (
    <>
      <NextUIProvider navigate={navigate}>
        <div className="min-h-screen flex flex-col">
          <WebSocketContextProvider user={user}>
            <Header />
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
