import {
  Badge,
  Dropdown,
  DropdownItem,
  DropdownMenu,
  DropdownTrigger,
  Link,
  Spinner,
  User,
} from '@nextui-org/react';
import { IconUserFilled } from '@tabler/icons-react';
import { useQueryClient } from '@tanstack/react-query';
import { useNavigate } from 'react-router-dom';
import { BUCKET_URL } from '../config/config.js';
import { logout } from '../pages/Auth/authService.js';

import { useAuthContext } from '../context/AuthContext.jsx';
import { useUser } from '../pages/Private/useUser.js';
import {
  useNotifications,
  userNotificationsQuery,
} from '../pages/Private/useNotifications.js';
import { useWebSocketContext } from '../context/WebSocketContext.jsx';

import { useEffect } from 'react';

export const loader = (queryClient) => async () => {
  try {
    const data = await queryClient.ensureQueryData(userNotificationsQuery);
    return data;
  } catch (error) {
    console.log(error);
    return error;
  }
};

export const UserAreaMenu = () => {
  const { data: user, isLoading: isLoadingUser } = useUser();
  const { data, isLoading: isLoadingNotifications } = useNotifications();
  const { socket, setNotifications, notifications } = useWebSocketContext();
  const { setIsLoggedIn } = useAuthContext();
  const navigate = useNavigate();
  const queryClient = useQueryClient();

  const handleLogout = async () => {
    await logout();
    setIsLoggedIn(false);
    localStorage.setItem('isLoggedIn', false);
    queryClient.removeQueries();
    navigate('/');
  };

  useEffect(() => {
    if (isLoadingNotifications) return;
    setNotifications(data.notifications);
  }, [data.notifications, setNotifications, isLoadingNotifications]);

  useEffect(() => {
    if (socket.readyState !== 0)
      socket.send(JSON.stringify({ userId: user.id }));
  }, [socket, user.id]);

  if (isLoadingNotifications || isLoadingUser) return <Spinner />;

  if (socket.readyState !== 0)
    socket.onmessage = (event) => {
      console.log(event.data);

      const message = JSON.parse(event.data);
      queryClient.invalidateQueries({
        queryKey: ['animals'],
      });
      console.log('Message received: ' + message);
      setNotifications((notifications) => [...notifications, message]);
    };

  const { avatar, firstName, lastName, username, email, role } = user;

  return (
    <Dropdown placement="bottom-end">
      <Badge
        content={
          data.total > notifications.length ? data.total : notifications.length
        }
        size="lg"
        color="primary"
        placement="top-left"
      >
        <DropdownTrigger>
          <User
            name={username}
            description={`${firstName === null ? 'J.' : firstName} ${
              lastName === null ? 'Doe' : lastName
            }`}
            avatarProps={{
              src: `${BUCKET_URL}/${avatar}`,
              isBordered: true,
              // color: isOnline ? 'success' : 'danger',
              as: 'button',
              showFallback: true,
              fallback: <IconUserFilled />,
            }}
          />
        </DropdownTrigger>
      </Badge>
      <DropdownMenu aria-label="Profile Actions" variant="flat">
        <DropdownItem
          key="signedMail"
          className="h-14 gap-2"
          textValue="user email"
        >
          <p className="font-semibold capitalize">has iniciado sesión como</p>
          <p className="font-semibold">{email}</p>
        </DropdownItem>
        <DropdownItem key="profile" textValue="user profile">
          <Link
            href={`/private/${role}`}
            color="foreground"
            className="capitalize w-full"
          >
            mi perfil
          </Link>
        </DropdownItem>
        <DropdownItem key="notifications" textValue="user notifications">
          <Link
            href={`/private/${role}`}
            color="foreground"
            className="capitalize w-full"
          >
            notificaciones
          </Link>
        </DropdownItem>
        <DropdownItem key="chats" textValue="user chats">
          <Link
            href={`/private/${role}`}
            color="foreground"
            className="capitalize w-full"
          >
            chats
          </Link>
        </DropdownItem>
        <DropdownItem
          key="logout"
          color="danger"
          onPress={handleLogout}
          className="capitalize w-full"
        >
          log out
        </DropdownItem>
      </DropdownMenu>
    </Dropdown>
  );
};
