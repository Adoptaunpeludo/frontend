import { fetchData } from '../../../../api/client';

export const getAnimalDetails = async (slug) => {
  const { data } = await fetchData(`/animals/${slug}`);

  return data;
};
