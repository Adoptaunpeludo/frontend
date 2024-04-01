import { updateData } from '../../../../api/client';

export const updatePassword = async (passwordPair) => {
  const { data } = await updateData('users/me/change-password', {
    passwordPair,
  });

  return data;
};
