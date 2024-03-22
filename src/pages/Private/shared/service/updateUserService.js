import { updateData } from '../../../../api/client';

export const updateProfile = async (formData, source) => {
  const updatedInfo = Object.fromEntries(formData);

  if (source === 'shelter-profile') {
    const facilities = Array.from(formData.getAll('facilities'));
    updatedInfo.facilities = facilities;
  }

  delete updatedInfo.intent;

  const { data } = await updateData('users/me', updatedInfo);
  return data;
};
