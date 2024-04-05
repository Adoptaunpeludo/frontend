import { fetchData } from '../../../api/client';

export const getUserAnimals = async (params = {}) => {
  const { data } = await fetchData('/users/me/animals', params);

  return data;
};

export const getUserFavs = async () => {
  const { data } = await fetchData('/users/me/favorites');

  return data;
};

export const getUserChats = async () => {
  const isLoggedIn = localStorage.getItem('isLoggedIn') === 'true';
  if (!isLoggedIn) return null;

  const { data } = await fetchData('/chats');

  return data;
};
