import { Outlet } from 'react-router-dom';
import { userQuery } from './useUser';

export const loader = (queryClient, isLoggedIn) => async () => {
  if (!isLoggedIn) return null;
  try {
    const data = await queryClient.ensureQueryData(userQuery);

    return data;
  } catch (error) {
    console.log(error);
    throw error;
  }
};

const ProtectedRoute = () => {
  return <Outlet />;
};

export default ProtectedRoute;
