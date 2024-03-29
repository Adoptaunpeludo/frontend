import { fetchData } from '../../../api/client';

export const getCurrentChat = async (slug) => {
  const { data } = await fetchData(`/chats/${slug}`);

  return data;
};

export const getShelterData = async (username) => {
  const { data } = await fetchData(`/users/${username}`);

  return data;
};
