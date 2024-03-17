import {
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

export const UserAreaMenu = ({ user }) => {
  const navigate = useNavigate();
  const queryClient = useQueryClient();
  const handleLogout = async () => {
    await logout();
    queryClient.removeQueries({ queryKey: ['user'] });
    navigate('/');
  };
  const { avatar, firstName, lastName, username, email, role } = user;

  return (
    <Dropdown placement="bottom-end">
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
      <DropdownMenu aria-label="Profile Actions" variant="flat">
        <DropdownItem key="signedMail" className="h-14 gap-2">
          <p className="font-semibold capitalize">has iniciado sesión como</p>
          <p className="font-semibold">{email}</p>
        </DropdownItem>
        <DropdownItem key="profile">
          <Link
            href={`/private/${role}`}
            color="foreground"
            className="capitalize"
          >
            mi perfil
          </Link>
        </DropdownItem>
        <DropdownItem key="notifications">
          <Link
            href={`/private/${role}`}
            color="foreground"
            className="capitalize"
          >
            <Link href={`/private/${role}`} color="foreground">
              notificaciones
            </Link>
          </Link>
        </DropdownItem>
        <DropdownItem key="chats">
          <Link
            href={`/private/${role}`}
            color="foreground"
            className="capitalize"
          >
            chats
          </Link>
        </DropdownItem>
        <DropdownItem
          key="logout"
          color="danger"
          onPress={handleLogout}
          className="capitalize"
        >
          log out
        </DropdownItem>
      </DropdownMenu>
    </Dropdown>
  );
};
