import { Outlet, useNavigate } from 'react-router-dom';
import Footer from './Footer';
import Header from './Header';
import { NextUIProvider } from '@nextui-org/react';

const AppLayout = () => {
  const navigate = useNavigate();

  return (
    <div>
      <NextUIProvider navigate={navigate}>
        <Header />
        <Outlet />
        <Footer />
      </NextUIProvider>
    </div>
  );
};

export default AppLayout;
