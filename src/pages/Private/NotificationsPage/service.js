import { deleteData, updateData } from '../../../api/client';

export const readNotification = async (id) => {
  const { data } = await updateData(`/users/me/notifications/read/${id}`);
  return data;
};

export const deleteNotification = async (id) => {
  const { data } = await deleteData(`/users/me/notifications/${id}`);
  return data;
};
