import { userChatsQuery } from '../Private/Shelters/useUserChats';
import { userNotificationsQuery } from '../Private/useNotifications';
import { userQuery } from '../Private/useUser';

export const loader = (queryClient) => async () => {
  const isLoggedIn = localStorage.getItem('isLoggedIn') === 'true';
  const isFirstLoad = localStorage.getItem('isFirstLoad') === 'true';
  if (!isLoggedIn || isFirstLoad)
    return { user: null, chats: null, notifications: null };

  try {
    const user = await queryClient.ensureQueryData(userQuery);
    const notifications = await queryClient.ensureQueryData(
      userNotificationsQuery
    );
    const chats = await queryClient.ensureQueryData(
      userChatsQuery(user.username)
    );

    return { user, chats, notifications };
  } catch (error) {
    return { user: null, notifications: null };
  }
};
