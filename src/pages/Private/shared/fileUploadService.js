import { postData } from '../../../api/client';

export const uploadFile = async (file) => {
  const formData = new FormData();
  formData.append('images', file);
  const { data } = await postData('users/upload-images', formData);

  return data;
};
