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
import { toast } from 'react-toastify';
import { useWebSocketContext } from '../context/WebSocketContext.jsx';

export const UserAreaMenu = ({ user, chats, notifications, isFetching }) => {
  const { isReady, send } = useWebSocketContext();
  const navigate = useNavigate();
  const queryClient = useQueryClient();

  const handleLogout = async () => {
    localStorage.setItem('isLoggedIn', false);
    try {
      await logout();
      if (isReady) {
        send(
          JSON.stringify({
            type: 'user-logout',
            username: user?.username,
            userId: user?.id,
          })
        );
      }
      queryClient.removeQueries({
        queryKey: ['user'],
      });
      queryClient.removeQueries({
        queryKey: ['user-notifications'],
      });
      queryClient.removeQueries({
        queryKey: ['user-favs'],
      });
      queryClient.removeQueries({
        queryKey: ['user-animals'],
      });
      queryClient.removeQueries({
        queryKey: ['user-chats'],
      });
      navigate('/');
    } catch (error) {
      toast.error('Error haciendo logout');

      throw error;
    }
  };

  return (
    <Dropdown placement="bottom-end">
      <Badge
        content={notifications?.unread}
        size="lg"
        color="primary"
        placement="top-left"
        isInvisible={isFetching}
      >
        <DropdownTrigger>
          <User
            name={
              <span className="block text-ellipsis overflow-hidden max-w-12 sm:max-w-full">
                {user?.username === null ? '' : user?.username}
              </span>
            }
            description={
              <span className="block text-ellipsis overflow-hidden max-w-12 sm:max-w-full">
                {user?.firstName === null ? '' : user?.firstName}{' '}
                {user?.lastName === null ? '' : user?.lastName}
              </span>
            }
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
            href={`/private/${user?.role}/${user?.username}`}
            color="foreground"
            className="capitalize w-full"
          >
            mi perfil
          </Link>
        </DropdownItem>
        <DropdownItem key="notifications" textValue="user notifications">
          <Link
            href={`/private/notifications`}
            color="foreground"
            className="capitalize w-full"
          >
            notificaciones
          </Link>
        </DropdownItem>

        <DropdownItem key="chats" textValue="user chats">
          <Link
            href={`/private/chat/${chats.at(-1)?.slug}`}
            color="foreground"
            isDisabled={chats.length === 0}
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
