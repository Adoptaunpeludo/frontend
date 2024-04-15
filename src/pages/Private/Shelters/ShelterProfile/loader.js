import { toast } from 'react-toastify';
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
      console.log(error);
      toast.error('Error cargando perfil. ¿Estás logueado?');
      throw error;
    }
  };
