import { Button, Input } from '@nextui-org/react';
import { IconLogin2 as LoginIcon } from '@tabler/icons-react';
import { useState } from 'react';
import { Form, Link, redirect } from 'react-router-dom';
import { toast } from 'react-toastify';
import { Hero, LogoHeader, Panel } from '../../../components';
import { handleAuthError } from '../../../utils/handleError';
import { validateField } from '../../../utils/validateField';
import { login } from '../../Auth/authService';

export const action = async ({ request }) => {
  const formData = await request.formData();
  const credentials = Object.fromEntries(formData);
  credentials.email = credentials.email.toLowerCase();

  try {
    await login(credentials);
    localStorage.setItem('isLoggedIn', true);
    return redirect('/');
  } catch (error) {
    const message = handleAuthError(error);
    toast.error(message);
    return redirect('/login');
  }
};

const LoginPage = () => {
  const [credentials, setCredentials] = useState({
    email: '',
    password: '',
  });

  const [errors, setErrors] = useState({});

  const handleChange = (event) => {
    const { name, value } = event.target;
    setCredentials((prevCredentials) => ({
      ...prevCredentials,
      [name]: value,
    }));
    setErrors({
      ...errors,
      [name]: validateField(name, value),
    });
  };

  const isFormValid = Object.values(errors).every((error) => error === '');
  const enableButton = !(
    credentials.email &&
    credentials.password &&
    isFormValid
  );

  return (
    <>
      <main className="bg-default-100 flex-grow">
        <Hero />
        <section
          id="login"
          className="max-w-screen-xl w-full flex flex-col gap-3 h-full justify-center py-12 mx-auto"
        >
          <LogoHeader />
          <Panel>
            <Form
              method="post"
              className="flex flex-col gap-6 max-w-lg mx-auto px-10 py-8"
            >
              <div>Inicia sesión en tu cuenta para continuar</div>
              <div className="flex flex-col gap-3">
                <Input
                  type="email"
                  label="email"
                  name="email"
                  placeholder="Introduce tu email"
                  color={errors.email ? 'danger' : 'none'}
                  onBlur={handleChange}
                  errorMessage={errors.email}
                  required
                ></Input>
                <Input
                  type="password"
                  name="password"
                  label="Password"
                  placeholder="Introduce tu password"
                  color={errors.password ? 'danger' : 'none'}
                  errorMessage={errors.password}
                  onChange={handleChange}
                  required
                ></Input>
              </div>
              <div className="flex justify-end">
                <Link to="#">¿Olvidaste tu password?</Link>
              </div>
              <div className="flex justify-center">
                <Button
                  isDisabled={enableButton}
                  type="submit"
                  color="primary"
                  variant="solid"
                  size="lg"
                  endContent={<LoginIcon />}
                  className="px-10"
                >
                  Iniciar sesión
                </Button>
              </div>
              <div className="flex justify-between">
                <div>¿Necesitas crear una cuenta?</div>
                <div>
                  <Link to="/register">Regístrate</Link>
                </div>
              </div>
            </Form>
          </Panel>
        </section>
      </main>
    </>
  );
};

export default LoginPage;
