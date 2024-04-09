import { Navigate, Outlet } from 'react-router-dom';
import { useUser } from './useUser';

const ProtectedRoute = () => {
  const { data: user } = useUser();

  return user ? <Outlet /> : <Navigate to={'/login'} />;
};

export default ProtectedRoute;
