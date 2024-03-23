import { Outlet } from 'react-router-dom';
import { useUser, userQuery } from './useUser';
import { useWebSocketContext } from '../../context/WebSocketContext';
import { useEffect } from 'react';

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
  const { data: user } = useUser();
  const { socket } = useWebSocketContext();

  useEffect(() => {
    if (socket.readyState !== 0)
      socket.send(JSON.stringify({ userId: user.id }));
  }, [socket, user.id]);

  return <Outlet />;
};

export default ProtectedRoute;
