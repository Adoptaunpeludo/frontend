import { fetchData } from '../../../api/client';

export const getCurrentChat = async (slug) => {
  const isLoggedIn = localStorage.getItem('isLoggedIn') === 'true';
  if (!isLoggedIn) return null;
  const { data } = await fetchData(`/chats/${slug}`);

  return data;
};

export const getReceiverData = async (username) => {
  const isLoggedIn = localStorage.getItem('isLoggedIn') === 'true';
  if (!isLoggedIn) return null;
  const { data } = await fetchData(`/users/${username}`);

  return data;
};

export const getChatHistory = async (chat) => {
  const isLoggedIn = localStorage.getItem('isLoggedIn') === 'true';
  if (!isLoggedIn) return null;
  const { data } = await fetchData(`/chats/history/${chat}`);

  return data;
};
