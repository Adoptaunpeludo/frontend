import { toast } from 'react-toastify';
import { register } from '../authService';
import { redirect } from 'react-router-dom';
import { handleAuthError } from '../../../utils/handleError';

export const action = async (data) => {
  const { request } = data;
  const formData = await request.formData();
  const registerData = Object.fromEntries(formData);

  try {
    const isEqualPass = registerData.password === registerData.repeatPassword;

    if (!isEqualPass) {
      throw new Error('Los passwords no coinciden!');
    }

    delete registerData.repeatPassword;
    registerData.username = registerData.username.toLowerCase();
    registerData.email = registerData.email.toLowerCase();

    await register(registerData);

    toast.success('Usuario creado, por favor valida tu email');

    return redirect('/login');
  } catch (error) {
    const message = handleAuthError(error);
    toast.error(message);
    return redirect('/register');
  }
};
