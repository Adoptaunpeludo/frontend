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
import { useWebSocketContext } from '../context/WebSocketContext.jsx';
import { toast } from 'react-toastify';
import { useNotifications } from '../pages/Private/useNotifications.js';
import { useUser } from '../pages/Private/useUser.js';
import { useEffect } from 'react';
import { useNotificationsContext } from '../context/NotificationsContext.jsx';

export const UserAreaMenu = () => {
  const { socket } = useWebSocketContext();
  const { data: user } = useUser();
  const { data: userNotifications } = useNotifications();
  const { notifications, setNotifications } = useNotificationsContext();
  const navigate = useNavigate();
  const queryClient = useQueryClient();

  const handleLogout = async () => {
    try {
      await logout();
      socket.close();
      sessionStorage.setItem('isLoggedIn', false);
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
    } catch (error) {
      toast.error('Error haciendo logout');
      throw error;
    }
  };

  useEffect(() => {
    setNotifications(userNotifications.notifications);
  }, [userNotifications, setNotifications]);

  return (
    <Dropdown placement="bottom-end">
      <Badge
        content={notifications?.length}
        size="lg"
        color="primary"
        placement="top-left"
      >
        <DropdownTrigger>
          <User
            name={user?.username}
            description={`${
              user?.firstName === null ? 'J.' : user?.firstName
            } ${user?.lastName === null ? 'Doe' : user?.lastName}`}
            avatarProps={{
              src: `${BUCKET_URL}/${user?.avatar}`,
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
          <p className="font-semibold">{user?.email}</p>
        </DropdownItem>
        <DropdownItem key="profile" textValue="user profile">
          <Link
            href={`/private/${user?.role}`}
            color="foreground"
            className="capitalize w-full"
          >
            mi perfil
          </Link>
        </DropdownItem>
        <DropdownItem key="notifications" textValue="user notifications">
          <Link
            href={`/private/${user?.role}`}
            color="foreground"
            className="capitalize w-full"
          >
            notificaciones
          </Link>
        </DropdownItem>
        <DropdownItem key="chats" textValue="user chats">
          <Link
            href={`/private/${user?.role}`}
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
