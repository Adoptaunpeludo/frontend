import { isAxiosError } from 'axios';
import { toast } from 'react-toastify';
import { updatePassword } from '../../shared/service/ChangePasswordService';
import { deleteAnimal } from '../AnimalForm/service';
import { updateProfile } from '../../shared/service/updateUserService';
import { isMatchFormData } from '../../../../utils/isMatchFormData';
import { getCurrentUser } from '../../service';

export const action =
  (closeBioModal, closeShelterModal, closeUpdatePasswordModal, queryClient) =>
  async ({ request }) => {
    let formData = await request.formData();
    let intent = formData.get('intent');
    const newData = Object.fromEntries(formData);
    const currentData = await getCurrentUser();
    if (intent === null) return null;

    if (intent === 'shelter-profile' || intent === 'user-profile') {
      if (intent === 'shelter-profile') {
        const facilities = Array.from(formData.getAll('facilities'));
        newData.facilities = facilities;
      }

      try {
        if (isMatchFormData(newData, currentData))
          return toast.error('Ningun dato modificado');

        await updateProfile(formData, intent);
        queryClient.invalidateQueries({ queryKey: ['user'] });
        toast.success('Perfil del Refugio actualizado');
        closeBioModal();
        closeShelterModal();
        return null;
      } catch (error) {
        if (isAxiosError(error) && error.response.status === 400)
          return toast.error('Error actualizando el perfil del Refugio');
        throw error;
      }
    }

    if (intent === 'delete-animal') {
      try {
        await deleteAnimal(formData);
        await queryClient.invalidateQueries((queryKey) =>
          queryKey.includes('animals')
        );
        toast.success(`Anuncio de adopción borrado`);
        return null;
      } catch (error) {
        if (isAxiosError(error) && error.response.status === 400)
          return toast.error('Error borrando el anuncio de adopción');
        throw error;
      }
    }

    if (intent === 'change-password') {
      try {
        await updatePassword(formData);
        toast.success(`Password cambiada con éxito`);
        closeUpdatePasswordModal();
        return null;
      } catch (error) {
        if (isAxiosError(error) && error.response.status === 400)
          return toast.error('Error cambiando password');
        throw error;
      }
    }
  };
