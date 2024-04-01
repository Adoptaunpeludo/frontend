import { fetchData } from '../../../api/client';

export const getUserAnimals = async (params = {}) => {
  const { data } = await fetchData('/users/me/animals', params);

  return data;
};

export const getUserFavs = async () => {
  const { data } = await fetchData('/users/me/favorites');

  console.log({ data });

  return data;
};

export const getUserChats = async () => {
  const { data } = await fetchData('/chats');

  return data;
};
