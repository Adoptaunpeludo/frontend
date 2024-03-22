import { deleteData } from '../../../../api/client';

export const deleteUser = async () => {
  const { data } = await deleteData('/users/me');

  return data;
};
