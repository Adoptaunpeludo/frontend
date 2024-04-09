import { fetchData } from '../../api/client';

export const getCurrentUser = async () => {
  const isLoggedIn = localStorage.getItem('isLoggedIn') === 'true';
  if (!isLoggedIn) return null;

  const { data } = await fetchData('/users/me');

  return data;
};

export const getUserNotifications = async () => {
  const isLoggedIn = localStorage.getItem('isLoggedIn') === 'true';
  if (!isLoggedIn) return null;

  const { data } = await fetchData('/users/me/notifications?limit=100');

  return data;
};
