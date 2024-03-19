import { fetchData } from '../../../api/client';

export const getShelters = async (params = {}) => {
  const { data } = await fetchData(`/users`, params);

  return data;
};
