import { toast } from 'react-toastify';
import { updatePassword } from '../../shared/service/ChangePasswordService';
import { deleteFav } from '../../../Public/Animals/service';
import { isMatchFormData } from '../../../../utils/isMatchFormData';
import { getCurrentUser } from '../../service';
import { updateProfile } from '../../shared/service/updateUserService';

export const action =
  (closeBioModal, closeUpdatePasswordModal, queryClient) =>
  async ({ request }) => {
    let formData = await request.formData();
    let intent = formData.get('intent');
    const newData = Object.fromEntries(formData);
    const currentData = await getCurrentUser();

    if (intent === 'user-profile') {
      try {
        if (isMatchFormData(newData, currentData))
          return toast.error('Ningun dato modificado');
        await updateProfile(formData, intent);
        queryClient.invalidateQueries({ queryKey: ['user'] });
        toast.success('Perfil actualizado');
        closeBioModal();
        return null;
      } catch (error) {
        return null;
      }
    }

    if (intent === 'remove-fav') {
      const id = formData.get('id');
      try {
        await deleteFav(id);
        queryClient.invalidateQueries({
          queryKey: ['animals'],
        });
        queryClient.invalidateQueries({
          queryKey: ['user-favs'],
        });
        return null;
      } catch (error) {
        return null;
      }
    }
    if (intent === 'change-password') {
      try {
        await updatePassword(formData);
        toast.success(`Password cambiada con éxito`);
        closeUpdatePasswordModal();
        return null;
      } catch (error) {
        return error;
      }
    }
  };
