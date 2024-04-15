import { toast } from 'react-toastify';
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
      console.log({ error });
      toast.error('Error cargando perfil, ¿Estás logueado?');
      return error;
    }
  };
