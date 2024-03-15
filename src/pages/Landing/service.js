import { fetchData } from '../../api/client';

export const getCats = async (params) => {
  console.log({ params });

  const { data } = await fetchData(`/animals?type=cat`, params);

  return data;
};

export const getDogs = async () => {
  const { data } = await fetchData('/animals?type=dog');

  return data;
};
