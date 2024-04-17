import {
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
import { IconLogin2 as LoginIcon } from '@tabler/icons-react';
import { useState } from 'react';

import { UserAreaMenu } from '../../components/UserAreaMenu.jsx';
import { useUserChats } from '../Private/Shelters/useUserChats.js';
import { useUser } from '../Private/useUser.js';
import { LogoMobile } from './components/LogoMobile.jsx';

import BrandNavLogo from './components/BrandNavLogo.jsx';

const Header = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const { data: user, isLoading: isLoadingUser } = useUser();
  const { data: chats, isLoading: isLoadingChats } = useUserChats(
    user?.username
  );
  const isFirstLoad = localStorage.getItem('isFirstLoad') === 'true';
  const isLoggedIn = localStorage.getItem('isLoggedIn') === 'true';

  const handleMenuOpenChange = (open) => {
    setIsMenuOpen(open);
  };

  const menuItems = [
    {
      name: 'Home',
      href: '/',
      color: 'foreground',
    },

    {
      name: 'Perros',
      href: '/animals/dogs',
      color: 'foreground',
    },
    {
      name: 'Gatos',
      href: '/animals/cats',
      color: 'foreground',
    },
    {
      name: 'Asociaciones',
      href: '/shelters',
      color: 'foreground',
    },
    {
      name: 'Conócenos',
      href: '/about',
      color: 'foreground',
    },

    {
      name: 'Asistente',
      href: `/private/assistant`,
      color: 'foreground',
    },
  ];

  return (
    <Navbar
      isMenuOpen={isMenuOpen}
      onMenuOpenChange={handleMenuOpenChange}
      maxWidth="xl"
      className="max-h-20"
    >
      <NavbarContent>
        <NavbarMenuToggle
          aria-label={isMenuOpen ? 'Close menu' : 'Open menu'}
          className="lg:hidden"
        />
        <NavbarBrand className="flex justify-center">
          <Link href="/">
            <BrandNavLogo className="hidden sm:flex" />
            <LogoMobile className="sm:hidden" />
          </Link>
        </NavbarBrand>
      </NavbarContent>

      <NavbarContent className="hidden lg:flex " justify="center">
        {menuItems.map((item, index) => {
          if (item.name === 'Asistente') {
            return null;
          }
          return (
            <NavbarItem
              key={`${item.name}-${index}`}
              onClick={(event) => {
                console.log({ event });
              }}
            >
              <Link color={item.color} href={item.href}>
                {item.name}
              </Link>
            </NavbarItem>
          );
        })}
        {user && (
          <NavbarItem key={`${menuItems.at(-1).name}`}>
            <Link color={menuItems.at(-1).color} href={menuItems.at(-1).href}>
              {menuItems.at(-1).name}
            </Link>
          </NavbarItem>
        )}
      </NavbarContent>
      <NavbarContent justify="end">
        <NavbarItem>
          {!isFirstLoad && (isLoadingUser || isLoadingChats) ? (
            <Spinner />
          ) : !user || !isLoggedIn ? (
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
              <UserAreaMenu user={user} chats={chats} />
            </div>
          )}
        </NavbarItem>
      </NavbarContent>
      <NavbarMenu>
        {menuItems.map((item, index) => {
          if (item.name === 'Asistente') {
            return null;
          }
          return (
            <NavbarMenuItem key={`${item.name}-${index}`}>
              <Link
                className="w-full"
                href={item.href}
                size="lg"
                color={item.color}
                onClick={() => setIsMenuOpen((isOpen) => !isOpen)}
              >
                {item.name}
              </Link>
            </NavbarMenuItem>
          );
        })}
        {user && (
          <NavbarItem key={`${menuItems.at(-1).name}`}>
            <Link color={menuItems.at(-1).color} href={menuItems.at(-1).href}>
              {menuItems.at(-1).name}
            </Link>
          </NavbarItem>
        )}
      </NavbarMenu>
    </Navbar>
  );
};
export default Header;
