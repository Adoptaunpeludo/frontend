import { Button, Checkbox, Input, Radio, RadioGroup } from '@nextui-org/react';
import { IconLogin2 as LoginIcon } from '@tabler/icons-react';
import { useState } from 'react';
import { Form, Link, redirect } from 'react-router-dom';
import { toast } from 'react-toastify';
import { Hero, LogoHeader, Panel } from '../../../components';
import { handleAuthError } from '../../../utils/handleError';
import { validateField } from '../../../utils/validateField';
import { register, verifyEmail } from '../authService';

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

    const data = await register(registerData);
    await verifyEmail(data.token);

    toast.success('Usuario creado');

    return redirect('/login');
  } catch (error) {
    const message = handleAuthError(error);
    toast.error(message);
    return redirect('/register');
  }
};

const RegisterPage = () => {
  const [credentials, setCredentials] = useState({});
  const [errors, setErrors] = useState({
    role: 'Selecciona tipo de perfil',
  });

  const handleChange = (event) => {
    const { name, value } = event.target;
    setCredentials({ ...credentials, [name]: value });
    setErrors({
      ...errors,
      [name]: validateField(name, value, credentials.password),
    });
  };

  const isFormValid = Object.values(errors).every((error) => error === '');
  const enableButton = !(
    credentials.role &&
    credentials.username &&
    credentials.email &&
    credentials.password &&
    credentials.password === credentials.repeatPassword &&
    isFormValid
  );

  return (
    <main className="bg-default-100 flex-grow">
      <Hero />
      <section
        id="login"
        className="max-w-screen-xl w-full flex flex-col gap-3 h-full justify-center py-12 mx-auto "
      >
        <LogoHeader />
        <Panel>
          <Form
            method="post"
            className="flex flex-col gap-6 max-w-4xl mx-auto px-10 py-8"
          >
            <div>Regístrate</div>
            <div id="profile">
              {/* TODO: useRadio hook to custom all inputs with the same styles  */}
              <RadioGroup
                name="role"
                label="Perfil"
                orientation="horizontal"
                errorMessage={errors.role}
                onChange={handleChange}
              >
                <Radio value="shelter">Protectora</Radio>
                <Radio value="adopter">Adoptante</Radio>
              </RadioGroup>
            </div>

            <div className="flex flex-col w-full gap-4">
              {/* TODO: useInput hook to custom all inputs with the same styles  */}
              <div className="flex w-full flex-wrap md:flex-nowrap gap-4">
                <Input
                  name="username"
                  className="min-w-72 "
                  type="text"
                  label="Nombre de la protectora / adoptante" //TODO: toggle by profile
                  placeholder="Introduce un nombre"
                  color={errors.username ? 'danger' : 'none'}
                  errorMessage={errors.username}
                  onBlur={handleChange}
                ></Input>

                <Input
                  name="email"
                  className="min-w-72 "
                  type="email"
                  label="Email"
                  placeholder="Introduce tu email"
                  color={errors.email ? 'danger' : 'none'}
                  errorMessage={errors.email}
                  onBlur={handleChange}
                ></Input>
              </div>
              <div className="flex w-full flex-wrap md:flex-nowrap gap-4">
                <Input
                  name="password"
                  className="min-w-72 "
                  type="password"
                  label="Password"
                  placeholder="Introduce tu password"
                  color={errors.password ? 'danger' : 'none'}
                  errorMessage={errors.password}
                  onChange={handleChange}
                ></Input>

                <Input
                  name="repeatPassword"
                  className="min-w-72 "
                  type="password"
                  label="confirm password"
                  placeholder="Introduce tu password"
                  color={errors.repeatPassword ? 'danger' : 'none'}
                  errorMessage={errors.repeatPassword}
                  onChange={handleChange}
                ></Input>
              </div>
            </div>

            <div className="flex flex-col justify-start">
              {/* TODO: useCheck hook to custom all inputs with the same styles  */}
              <Checkbox checked={false} radius="full">
                Acepto recibir otras comunicaciones de Adopta un peludo
              </Checkbox>
              <Checkbox checked={false} radius="full">
                Autorizo a Adopta un peludo a almacenar y procesar mis datos
                personales
              </Checkbox>
            </div>
            <div className="flex justify-center">
              <Button
                isDisabled={enableButton}
                type="submit"
                color="primary"
                href="#"
                variant="solid"
                size="lg"
                endContent={<LoginIcon />}
                className="px-10"
              >
                Regístrate
              </Button>
            </div>
            <div className="flex justify-center gap-2">
              <div>¿Ya tienes una cuenta?</div>
              <div>
                <Link to="/login">Inicia sesión</Link>
              </div>
            </div>
          </Form>
        </Panel>
      </section>
    </main>
  );
};

export default RegisterPage;
