import {
  Avatar,
  Button,
  Link,
  Navbar,
  NavbarBrand,
  NavbarContent,
  NavbarItem,
  NavbarMenu,
  NavbarMenuItem,
  NavbarMenuToggle,
  Spinner,
} from '@nextui-org/react';
import { useState } from 'react';
import BrandNavLogo from '../../assets/logos/BrandNavLogo.jsx';
import { logout } from '../Auth/authService.js';

import { IconLogin2 as LoginIcon } from '@tabler/icons-react';
import { useUser } from './useUser.js';
import { useNavigate } from 'react-router-dom';
import { useQueryClient } from '@tanstack/react-query';

const Header = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const navigate = useNavigate();
  const queryClient = useQueryClient();
  const { data: user, isLoading } = useUser();

  const handleMenuOpenChange = (open) => {
    setIsMenuOpen(open);
  };

  const handleLogout = async () => {
    await logout();
    queryClient.removeQueries({ queryKey: ['user'] });
    navigate('/');
  };

  const menuItems = [
    {
      name: 'Home',
      href: '/',
      color: 'foreground',
    },
    {
      name: 'Perros',
      href: '/dogs',
      color: 'foreground',
    },
    {
      name: 'Gatos',
      href: '/cats',
      color: 'foreground',
    },
    {
      name: 'Asociaciones',
      href: '/shelters',
      color: 'foreground',
    },
  ];

  return (
    <Navbar
      isMenuOpen={isMenuOpen}
      onMenuOpenChange={handleMenuOpenChange}
      maxWidth="xl"
    >
      <NavbarContent>
        <NavbarMenuToggle
          aria-label={isMenuOpen ? 'Close menu' : 'Open menu'}
          className="sm:hidden"
        />
        <NavbarBrand>
          <Link href="/">
            <BrandNavLogo />
          </Link>
        </NavbarBrand>
      </NavbarContent>

      <NavbarContent className="hidden sm:flex gap-4" justify="center">
        {menuItems.map((item, index) => (
          <NavbarItem key={`${item.name}-${index}`}>
            <Link color={item.color} href={item.href}>
              {item.name}
            </Link>
          </NavbarItem>
        ))}
      </NavbarContent>
      <NavbarContent justify="end">
        <NavbarItem>
          {!user ? (
            <Button
              as={Link}
              color="primary"
              href="/login"
              variant="solid"
              size="sm"
              endContent={<LoginIcon />}
            >
              Login
            </Button>
          ) : (
            <div className="flex gap-2">
              {isLoading && <Spinner />}
              <Avatar
                isBordered
                as="button"
                className="transition-transform"
                color="secondary"
                name="Jason Hughes"
                size="sm"
                src="https://i.pravatar.cc/150?u=a042581f4e29026704d"
              />
              <Button
                onClick={handleLogout}
                color="primary"
                href="/login"
                variant="solid"
                size="sm"
                endContent={<LoginIcon />}
              >
                Logout
              </Button>
            </div>
          )}
        </NavbarItem>
      </NavbarContent>
      <NavbarMenu>
        {menuItems.map((item, index) => (
          <NavbarMenuItem key={`${item.name}-${index}`}>
            <Link
              className="w-full"
              href={item.href}
              size="lg"
              color={item.color}
            >
              {item.name}
            </Link>
          </NavbarMenuItem>
        ))}
      </NavbarMenu>
    </Navbar>
  );
};
export default Header;
