import {
  Badge,
  Dropdown,
  DropdownItem,
  DropdownMenu,
  DropdownTrigger,
  Link,
  User,
} from '@nextui-org/react';
import { IconUserFilled } from '@tabler/icons-react';
import { useQueryClient } from '@tanstack/react-query';
import { useNavigate } from 'react-router-dom';
import { BUCKET_URL } from '../config/config.js';
import { logout } from '../pages/Auth/authService.js';

import { useAuthContext } from '../context/AuthContext.jsx';
import {
  useNotifications,
  userNotificationsQuery,
} from '../pages/Private/useNotifications.js';
import { useWebSocketContext } from '../context/WebSocketContext.jsx';

import { useEffect } from 'react';
import { useUser } from '../pages/Private/useUser.js';

export const loader = (queryClient, isLoggedIn) => async () => {
  console.log({ isLoggedIn });
  if (!isLoggedIn) return null;
  try {
    const data = await queryClient.ensureQueryData(userNotificationsQuery);
    return data;
  } catch (error) {
    console.log(error);
    return error;
  }
};

export const UserAreaMenu = () => {
  const { data: user } = useUser();
  const { data } = useNotifications();
  const { socket, setNotifications, notifications } = useWebSocketContext();
  const { setIsLoggedIn } = useAuthContext();
  const navigate = useNavigate();
  const queryClient = useQueryClient();

  const handleLogout = async () => {
    await logout();
    socket.close();
    setIsLoggedIn(false);
    localStorage.setItem('isLoggedIn', false);
    queryClient.removeQueries([
      {
        queryKey: ['user'],
      },
      {
        queryKey: ['user-notifications'],
      },
      {
        queryKey: ['user-favs'],
      },
      {
        queryKey: ['user-animals'],
      },
    ]);
    navigate('/');
  };

  useEffect(() => {
    setNotifications(data.notifications);
  }, [data, setNotifications]);

  useEffect(() => {
    if (socket.readyState !== 0)
      socket.send(JSON.stringify({ userId: user.id }));
  }, [socket, user.id]);

  if (socket.readyState !== 0)
    socket.onmessage = (event) => {
      const message = JSON.parse(event.data);
      if (message.type === 'animal-changed') {
        queryClient.invalidateQueries({
          queryKey: ['animals'],
        });
        setNotifications((notifications) => [...notifications, message]);
      }

      if (message.type.startsWith('user'))
        queryClient.invalidateQueries({
          queryKey: ['shelters'],
        });
    };

  const { avatar, firstName, lastName, username, email, role } = user;

  return (
    <Dropdown placement="bottom-end">
      <Badge
        content={
          data?.total > notifications.length
            ? data?.total
            : notifications.length
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
