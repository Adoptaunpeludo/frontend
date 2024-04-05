import { updateData } from '../../../../api/client';

export const updatePassword = async (formData) => {
  const updatedData = Object.fromEntries(formData);
  delete updatedData.intent;
  delete updatedData.repeatPassword;
  const { data } = await updateData('users/me/change-password', updatedData);
  return data;
};
