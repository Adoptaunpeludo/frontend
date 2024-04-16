import { redirect } from 'react-router-dom';
import { userAnimalsQuery } from '../../Shelters/useUserAnimals';
import { userChatsQuery } from '../../Shelters/useUserChats';

export const loader =
  (queryClient) =>
  async ({ params }) => {
    try {
      const data = await queryClient.ensureQueryData(
        userAnimalsQuery('adopter')
      );

      const chats = await queryClient.ensureQueryData(
        userChatsQuery(params.username)
      );

      return { data, chats };
    } catch (error) {
      if (error.response.status && error.response.status === 401) {
        return redirect('/login');
      }
      return error;
    }
  };
