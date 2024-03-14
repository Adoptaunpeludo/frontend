import { fetchData } from '../../api/client';

export const getCurrentUser = async () => {
  const { data } = await fetchData('/users/me');

  console.log({ data });

  return data;
};
