import { updateData } from '../../../../api/client';

export const updateSocialMedia = async (socialMedia) => {
  const { data } = await updateData('users/me/update-social-media', {
    socialMedia,
  });

  return data;
};
