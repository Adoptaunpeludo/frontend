import { redirect } from 'react-router-dom';

import { userChatsQuery } from '../useUserChats';
import { userAnimalsQuery } from '../useUserAnimals';

export const loader =
  (queryClient) =>
  async ({ params }) => {
    try {
      const animals = await queryClient.ensureQueryData(
        userAnimalsQuery('shelter', { limit: 100 })
      );
      const chats = await queryClient.ensureQueryData(
        userChatsQuery(params.username)
      );
      return { chats, animals };
    } catch (error) {
      if (error.response.status && error.response.status === 401) {
        return redirect('/login');
      }
      return error;
    }
  };
