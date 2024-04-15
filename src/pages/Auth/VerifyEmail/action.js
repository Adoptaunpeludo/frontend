import { toast } from 'react-toastify';
import { resendValidationEmail } from '../authService';
import { redirect } from 'react-router-dom';

export const action = async ({ request }) => {
  const formData = await request.formData();
  const credentials = Object.fromEntries(formData);
  credentials.email = credentials.email.toLowerCase();

  try {
    const { email } = credentials;
    const res = await resendValidationEmail(email);

    if (res.status === 400) {
      throw new Error(res.response.data.message);
    }
    if (res.status === 500) {
      throw new Error(res.response.data.message);
    }

    toast.success('Email de validacion enviado');

    return redirect('/login');
  } catch (error) {
    console.log({ error });
    toast.error(error.response.data.message);
    return null;
  }
};
