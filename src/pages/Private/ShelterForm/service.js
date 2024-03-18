import { updateData } from '../../../api/client';

export const updateSocialMedia = async (socialMedia) => {
  const { data } = await updateData('users/me/update-social-media', {
    socialMedia,
  });

  return data;
};

export const updateShelterProfile = async (formData) => {
  const updatedInfo = Object.fromEntries(formData);

  const facilities = Array.from(formData.getAll('facilities'));

  updatedInfo.facilities = facilities;

  delete updatedInfo.intent;

  const { data } = await updateData('users/me', updatedInfo);
  return data;
};
