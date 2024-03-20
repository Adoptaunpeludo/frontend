import { deleteData, postData, updateData } from '../../../../api/client';

export const updateSocialMedia = async (socialMedia) => {
  const { data } = await updateData('users/me/update-social-media', {
    socialMedia,
  });

  return data;
};

export const updateShelterProfile = async (formData, source) => {
  const updatedInfo = Object.fromEntries(formData);

  if (source === 'shelter-profile') {
    const facilities = Array.from(formData.getAll('facilities'));
    updatedInfo.facilities = facilities;
  }

  delete updatedInfo.intent;

  const { data } = await updateData('users/me', updatedInfo);
  return data;
};

export const createPetAdoption = async (formData) => {
  const creationData = Object.fromEntries(formData);

  delete creationData.intent;

  const { data } = await postData(`animals/${creationData.type}`, creationData);

  return data;
};

export const deleteAnimal = async (formData) => {
  const deletionData = Object.fromEntries(formData);

  console.log({ deletionData });

  delete deletionData.intent;

  const { data } = await deleteData(`animals/${deletionData.slug}`);

  return data;
};

export const uploadAnimalImages = async (images, animalId) => {
  const { data } = await postData(`animals/upload-images/${animalId}`, images);

  return data;
};
