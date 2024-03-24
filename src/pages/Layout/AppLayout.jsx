import { NextUIProvider } from '@nextui-org/react';
import { Outlet, ScrollRestoration, useNavigate } from 'react-router-dom';
import Footer from './Footer';
import Header from './Header';
import { useUser } from '../Private/useUser';
import { useNotifications } from '../Private/useNotifications';
import { useAuthContext } from '../../context/AuthContext';
import { useEffect } from 'react';
import { useWebSocketContext } from '../../context/WebSocketContext';

const AppLayout = () => {
  const navigate = useNavigate();
  const { data: user } = useUser();
  const { data: notifications } = useNotifications();
  const { setIsLoggedIn } = useAuthContext();
  const { socket } = useWebSocketContext();

  useEffect(() => {
    sessionStorage.setItem('isLoggedIn', user !== null);
    const isLoggedIn = sessionStorage.getItem('isLoggedIn') === 'true' && user;
    setIsLoggedIn(isLoggedIn);
  }, [setIsLoggedIn, user]);

  useEffect(() => {
    console.log('useEffect');
    if (user && socket.readyState !== 0)
      socket.send(JSON.stringify({ userId: user.id }));
  }, [socket, user]);

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
