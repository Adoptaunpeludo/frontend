import { updateData } from '../../../api/client';

export const readNotification = async (id) => {
  const { data } = await updateData(`/users/me/notifications/read/${id}`);
  return data;
};
