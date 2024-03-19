import { fetchData } from '../../../api/client';

export const getUserAnimals = async (params = {}) => {
  const { data } = await fetchData('/users/me/animals', params);

  return data;
};
