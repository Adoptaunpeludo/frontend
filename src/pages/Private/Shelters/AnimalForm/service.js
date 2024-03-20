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
