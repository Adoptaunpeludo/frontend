import { fetchData } from '../../api/client';

export const getCurrentUser = async () => {
  const { data } = await fetchData('/users/me');

  return data;
};

export const getUserNotifications = async () => {
  const { data } = await fetchData('/users/me/notifications');

  return data;
};
