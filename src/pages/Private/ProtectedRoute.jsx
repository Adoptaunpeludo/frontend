import { Outlet, redirect, useNavigate } from 'react-router-dom';
import { useUser, userQuery } from './useUser';
import { toast } from 'react-toastify';
import { useEffect } from 'react';

export const loader = (queryClient) => async () => {
  try {
    const data = await queryClient.ensureQueryData(userQuery);
    return data;
  } catch (error) {
    console.log(error);
    toast.error('Por favor primero haz Login con tu cuenta');
    return redirect('/login');
  }
};

const ProtectedRoute = () => {
  const { data } = useUser();
  const navigate = useNavigate();

  useEffect(() => {
    navigate(`/private/${data.role}`);
  }, [data.role, navigate]);

  return <Outlet />;
};

export default ProtectedRoute;
