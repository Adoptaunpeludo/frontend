import { fetchData } from '../../../api/client';

export const getCats = async (params = {}) => {
  const { data } = await fetchData(`/animals?type=cat`, params);

  return data;
};

export const getDogs = async (params = {}) => {
  const { data } = await fetchData(`/animals?type=dog`, params);

  return data;
};

export const getAnimals = async (params = {}, shelterName = '') => {
  const endPoint = shelterName
    ? `/animals?shelterName=${shelterName}`
    : '/animals';

  const { data } = await fetchData(endPoint, params);

  return data;
};
