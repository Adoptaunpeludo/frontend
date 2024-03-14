import { Button, Input } from '@nextui-org/react';
import { IconLogin2 as LoginIcon } from '@tabler/icons-react';
import { Link, Form, redirect } from 'react-router-dom';
import { login } from '../../Auth/authService';
import { Hero, LogoHeader, Panel } from '../../../components';
import { handleAuthError } from '../../../utils/handleAuthError';
import { toast } from 'react-toastify';

export const action = async ({ request }) => {
  const formData = await request.formData();
  const credentials = Object.fromEntries(formData);

  try {
    await login(credentials);
    return redirect('/');
  } catch (error) {
    const message = handleAuthError(error);
    toast.error(message);
    return redirect('/login');
  }
};

const LoginPage = () => {
  return (
    <>
      <main className="bg-default-100">
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
                  required
                ></Input>
                <Input
                  type="password"
                  name="password"
                  label="Password"
                  placeholder="Introduce tu password"
                  required
                ></Input>
              </div>
              <div className="flex justify-end">
                <Link to="#">¿Olvidaste tu password?</Link>
              </div>
              <div className="flex justify-center">
                <Button
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
