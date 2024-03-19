import { fetchData } from '../../../api/client';

export const getShelters = async (params = {}) => {
  const { data } = await fetchData(`/users?role=shelter`, params);

  return data;
};
