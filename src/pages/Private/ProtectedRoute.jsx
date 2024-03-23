import { Outlet, redirect } from 'react-router-dom';
import { useUser, userQuery } from './useUser';
import { toast } from 'react-toastify';
import { useWebSocketContext } from '../../context/WebSocketContext';
import { useEffect } from 'react';

export const loader = (queryClient, isLoggedIn) => async () => {
  if (!isLoggedIn) return null;
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
  const { data: user } = useUser();
  const { socket } = useWebSocketContext();

  useEffect(() => {
    if (socket.readyState !== 0)
      socket.send(JSON.stringify({ userId: user.id }));
  }, [socket, user.id]);

  return <Outlet />;
};

export default ProtectedRoute;
