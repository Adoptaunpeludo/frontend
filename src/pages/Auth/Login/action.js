import { redirect } from 'react-router-dom';
import { login } from '../authService';

export const action =
  (queryClient) =>
  async ({ request }) => {
    const formData = await request.formData();
    const credentials = Object.fromEntries(formData);
    credentials.email = credentials.email.toLowerCase();

    try {
      await login(credentials);
      localStorage.setItem('isLoggedIn', true);
      queryClient.invalidateQueries({
        queryKey: ['user'],
      });
      queryClient.invalidateQueries({
        queryKey: ['user-notifications'],
      });
      return redirect('/');
    } catch (error) {
      return redirect('/login');
    }
  };
