import { fetchData } from '../../api/client';

export const getCats = async () => {
  const { data } = fetchData('/animals?type=cat');

  return data;
};

export const getDogs = async () => {
  const { data } = fetchData('/animals?type=dog');

  return data;
};
