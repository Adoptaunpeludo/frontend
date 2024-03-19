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
import BrandNavLogo from '../../assets/logos/BrandNavLogo.jsx';
import { UserAreaMenu } from '../../components/UserAreaMenu.jsx';
import { useUser } from '../Private/useUser.js';

const Header = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const { data: user, isLoading } = useUser();

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
  ];

  return (
    <header className="h-16">
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

        <NavbarContent className="hidden sm:flex " justify="center">
          {menuItems.map((item, index) => (
            <NavbarItem key={`${item.name}-${index}`}>
              <Link color={item.color} href={item.href}>
                {item.name}
              </Link>
            </NavbarItem>
          ))}
        </NavbarContent>
        <NavbarContent justify="end">
          {isLoading ? (
            <Spinner />
          ) : (
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
                  <UserAreaMenu />
                </div>
              )}
            </NavbarItem>
          )}
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
    </header>
  );
};
export default Header;
