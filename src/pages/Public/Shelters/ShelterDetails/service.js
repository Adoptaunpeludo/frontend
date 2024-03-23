import { fetchData } from '../../../../api/client';

export const getShelterDetails = async (username) => {
  const { data } = await fetchData(`/users/?username=${username}`);
  return data;
};

export const getShelterAnimals = async (shelterId) => {
  const { data } = await fetchData(`/animals?createdBy=${shelterId}`);

  return data;
};
