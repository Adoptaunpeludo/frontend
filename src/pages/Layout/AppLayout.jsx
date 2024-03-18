import { NextUIProvider } from '@nextui-org/react';
import { Outlet, ScrollRestoration, useNavigate } from 'react-router-dom';
import Footer from './Footer';
import Header from './Header';
import { userQuery } from './useUser';

export const loader = queryClient => async () => {
  const isLoggedIn = localStorage.getItem('isLoggedIn') === 'true';

  if (!isLoggedIn) {
    return null;
  }

  try {
    const data = await queryClient.ensureQueryData(userQuery);
    if (!data) return null;
    return data;
  } catch (error) {
    console.log(error);
    return null;
  }
};

const AppLayout = () => {
  const navigate = useNavigate();

  return (
    <>
      <NextUIProvider navigate={navigate}>
        <div className='min-h-screen flex flex-col'>
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
