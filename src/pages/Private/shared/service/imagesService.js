import { postData } from '../../../../api/client';

export const uploadUserFile = async (file) => {
  const formData = new FormData();
  formData.append('images', file);
  const { data } = await postData('users/upload-images', formData);

  return data;
};

export const deleteUserFile = async (deleteImages) => {
  const { data } = await postData('users/upload-images', { deleteImages });

  return data;
};
