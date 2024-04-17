import { redirect } from 'react-router-dom';
import { toast } from 'react-toastify';
import { resendValidationEmail } from '../authService';

export const action = async ({ request }) => {
  const formData = await request.formData();
  const credentials = Object.fromEntries(formData);
  credentials.email = credentials.email.toLowerCase();

  try {
    const { email } = credentials;
    await resendValidationEmail(email);

    toast.success('Email de validación enviado');

    return redirect('/login');
  } catch (error) {
    console.log(error);
    return null;
  }
};
