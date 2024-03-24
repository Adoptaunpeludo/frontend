import { deleteData, fetchData, postData } from '../../../api/client';

export const getAnimalDetails = async (slug) => {
  const { data } = await fetchData(`/animals/${slug}`);

  return data;
};

export const addFav = async (id) => {
  const { data } = await postData(`/animals/add-favorite/${id}`);

  return data;
};

export const deleteFav = async (id) => {
  const { data } = await deleteData(`/animals/remove-favorite/${id}`);

  return data;
};
