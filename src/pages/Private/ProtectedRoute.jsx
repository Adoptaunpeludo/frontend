import { Navigate, Outlet, useOutletContext } from 'react-router-dom';

const ProtectedRoute = () => {
  const { user, notifications } = useOutletContext();

  return user ? (
    <Outlet context={{ user, notifications }} />
  ) : (
    <Navigate to={'/login'} />
  );
};

export default ProtectedRoute;
