import { Navigate, Outlet, useOutletContext } from 'react-router-dom';

const ProtectedRoute = () => {
  const { user } = useOutletContext();

  return user ? <Outlet /> : <Navigate to={'/login'} />;
};

export default ProtectedRoute;
