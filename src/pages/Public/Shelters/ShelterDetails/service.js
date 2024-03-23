import { fetchData } from '../../../../api/client';

export const getShelterDetails = async (username) => {
  const { data } = await fetchData(`/users?username=${username}`);
  return data;
};

export const getShelterAnimals = async (shelterName) => {
  const { data } = await fetchData(`/animals?shelterName=${shelterName}`);

  return data;
};
