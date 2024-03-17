import { Outlet, useNavigate } from 'react-router-dom';
import Footer from './Footer';
import Header from './Header';
import { NextUIProvider } from '@nextui-org/react';
import { userQuery } from './useUser';

export const loader = (queryClient) => async () => {
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
