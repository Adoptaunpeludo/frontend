import { toast } from 'react-toastify';
import { deleteFav } from '../pages/Public/Animals/service';

export const handleFavError = async (error, id, queryClient) => {
  if (error.response.status === 400) {
    if (error.response.data.message.startsWith('Already')) {
      await deleteFav(id);
      queryClient.invalidateQueries({
        queryKey: ['animals'],
      });
    } else toast.warn('No puedes añadir un animal propio a favoritos');
  }
  if (error.response.status === 401) toast.warn('Primero haz Login');
};
