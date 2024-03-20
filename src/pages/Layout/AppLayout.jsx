import { NextUIProvider } from '@nextui-org/react';
import { Outlet, ScrollRestoration, useNavigate } from 'react-router-dom';
import Footer from './Footer';
import Header from './Header';

const AppLayout = () => {
  const navigate = useNavigate();

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
