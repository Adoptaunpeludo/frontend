import { Outlet, redirect, useNavigation } from 'react-router-dom';
import { useUser, userQuery } from './useUser';
import { toast } from 'react-toastify';
import { useNotifications, userNotificationsQuery } from './useNotifications';
import { useWebSocketContext } from '../../context/WebSocketContext';
import { useEffect } from 'react';

export const loader = (queryClient) => async () => {
  try {
    const data = await queryClient.ensureQueryData(userQuery);
    await queryClient.ensureQueryData(userNotificationsQuery);
    return data;
  } catch (error) {
    console.log(error);
    toast.error('Por favor primero haz Login con tu cuenta');
    return redirect('/login');
  }
};

const ProtectedRoute = () => {
  const { data: user } = useUser();
  const { data } = useNotifications();
  const { socket, setNotifications } = useWebSocketContext();
  const navigation = useNavigation();

  console.log(navigation.state);

  useEffect(() => {
    setNotifications(data.notifications);
  }, [data.notifications, setNotifications]);

  useEffect(() => {
    if (socket.readyState !== 0)
      socket.send(JSON.stringify({ userId: user.id }));
  }, [socket, user.id]);

  return <Outlet />;
};

export default ProtectedRoute;
