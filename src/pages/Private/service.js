import { fetchData } from '../../api/client';

export const getUserAnimals = async () => {
  const { data } = await fetchData('/users/me/animals', {});

  return data;
};
