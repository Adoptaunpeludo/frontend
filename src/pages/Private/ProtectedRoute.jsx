import { Navigate, Outlet, useOutletContext } from 'react-router-dom';
import { useUser } from './useUser';

const ProtectedRoute = () => {
  const { notifications } = useOutletContext();
  const { data: user } = useUser();

  return user ? (
    <Outlet context={{ user, notifications }} />
  ) : (
    <Navigate to={'/login'} />
  );
};

export default ProtectedRoute;
