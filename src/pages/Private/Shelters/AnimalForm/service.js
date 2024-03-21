import { deleteData, postData } from '../../../../api/client';

export const createPetAdoption = async (formData) => {
  const creationData = Object.fromEntries(formData);

  delete creationData.intent;

  const { data } = await postData(`animals/${creationData.type}`, creationData);

  return data;
};

export const deleteAnimal = async (formData) => {
  const deletionData = Object.fromEntries(formData);

  delete deletionData.intent;

  const { data } = await deleteData(`animals/${deletionData.slug}`);

  return data;
};

export const uploadAnimalImages = async (images, animalId) => {
  const { data } = await postData(`animals/upload-images/${animalId}`, images);

  return data;
};

export const uploadAnimalFile = async (file, id) => {
  const formData = new FormData();
  formData.append('images', file);
  const { data } = await postData(`animals/upload-images/${id}`, formData);

  return data;
};

export const deleteAnimalFile = async (deleteImages, id) => {
  const { data } = await postData(`animals/upload-images/${id}`, {
    deleteImages,
  });

  return data;
};
