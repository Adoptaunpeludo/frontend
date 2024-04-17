import { toast } from 'react-toastify';
import { redirect } from 'react-router-dom';

import { resetPassword } from '../authService';

export const action = async ({ request, params }) => {
  const formData = await request.formData();
  const credentials = Object.fromEntries(formData);
  const { password, repeatPassword } = credentials;
  const { token } = params;

  const isEqualPass = password === repeatPassword;

  try {
    if (isEqualPass) {
      await resetPassword({ password, token });

      toast.success('Contraseña cambiada');
      return redirect('/login');
    } else {
      toast.error('Las contraseñas no coinciden');
      return null;
    }
  } catch (error) {
    return null;
  }
};
