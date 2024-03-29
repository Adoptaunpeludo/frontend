import { fetchData } from '../../../api/client';

export const getCurrentChat = async (slug) => {
  const { data } = await fetchData(`/chats/${slug}`);

  return data;
};
