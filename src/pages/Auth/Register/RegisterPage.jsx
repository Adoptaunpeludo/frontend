import { Button, Input, Radio, RadioGroup, Skeleton } from '@nextui-org/react';
import { IconLogin2 as LoginIcon } from '@tabler/icons-react';
import { useState } from 'react';
import { Form, Link, redirect, useNavigation } from 'react-router-dom';
import { toast } from 'react-toastify';
import { H2Title, LogoHeader, Panel } from '../../../components';
import {
  inputStyleConfig,
  radioGroupStyleConfig,
  radioStyleConfig,
} from '../../../utils/configFormFields';
import { handleAuthError } from '../../../utils/handleError';
import { validateField } from '../../../utils/validateField';
import { register } from '../authService';

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

const RegisterPage = () => {
  const [credentials, setCredentials] = useState({});
  const [errors, setErrors] = useState({
    role: '',
  });
  const navigation = useNavigation();

  const isLoading = navigation.state === 'submitting';

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
    <main className="bg-default-100 flex-grow ">
      <Skeleton
        isLoaded={!isLoading}
        className="max-w-screen-xl w-full flex flex-col gap-3 h-full justify-center py-10 mx-auto"
      >
        <section
          id="register"
          className="max-w-screen-xl w-full flex flex-col gap-3 h-full justify-center py-10 mx-auto "
        >
          <LogoHeader className="mx-auto" />
          <Panel className={'max-w-2xl mx-auto'}>
            <Form
              method="post"
              className="flex flex-col gap-6  mx-auto px-10 py-8 justify-center"
            >
              <H2Title title={'Regístrate'} className={'mx-auto'} />

              <RadioGroup
                name="role"
                label="Perfil"
                orientation="horizontal"
                errorMessage={errors.role}
                onChange={handleChange}
                className="mx-auto"
                classNames={radioGroupStyleConfig}
                isRequired
              >
                <Radio value="shelter" classNames={radioStyleConfig}>
                  Protectora
                </Radio>
                <Radio value="adopter" classNames={radioStyleConfig}>
                  Adoptante
                </Radio>
              </RadioGroup>

              <div className="flex flex-col w-full gap-4">
                <div className="flex w-full flex-wrap md:flex-nowrap gap-4">
                  <Input
                    name="username"
                    className="min-w-72 "
                    classNames={inputStyleConfig}
                    type="text"
                    label={`Nombre ${
                      credentials.role === undefined
                        ? ' '
                        : credentials.role === 'shelter'
                          ? 'de protectora'
                          : 'de adoptante'
                    }`}
                    placeholder="Introduce un nombre"
                    color={errors.username ? 'danger' : 'none'}
                    errorMessage={errors.username}
                    onBlur={handleChange}
                    isRequired
                  />

                  <Input
                    name="email"
                    className="min-w-72 "
                    classNames={inputStyleConfig}
                    type="email"
                    label="Email"
                    placeholder="Introduce tu email"
                    color={errors.email ? 'danger' : 'none'}
                    errorMessage={errors.email}
                    onBlur={handleChange}
                    isRequired
                  />
                </div>
                <div className="flex w-full flex-wrap md:flex-nowrap gap-4">
                  <Input
                    name="password"
                    className="min-w-72 "
                    classNames={inputStyleConfig}
                    type="password"
                    label="Password"
                    placeholder="Introduce tu password"
                    color={errors.password ? 'danger' : 'none'}
                    errorMessage={errors.password}
                    onBlur={handleChange}
                    isRequired
                  />

                  <Input
                    name="repeatPassword"
                    className="min-w-72 "
                    classNames={inputStyleConfig}
                    type="password"
                    label="confirmar password"
                    placeholder="Introduce tu password"
                    color={errors.repeatPassword ? 'danger' : 'none'}
                    errorMessage={errors.repeatPassword}
                    onBlur={handleChange}
                    isRequired
                  />
                </div>
              </div>

              <div className="flex justify-center">
                <Button
                  isDisabled={enableButton}
                  type="submit"
                  color="primary"
                  variant="solid"
                  size="lg"
                  endContent={<LoginIcon />}
                  className="px-10 font-poppins"
                >
                  Regístrate
                </Button>
              </div>
              <div className="flex justify-center gap-1 font-medium font-poppins">
                <span>¿Ya tienes una cuenta?</span>
                <Link to="/login" className="text-tertiary">
                  Inicia sesión
                </Link>
              </div>
            </Form>
          </Panel>
        </section>
      </Skeleton>
    </main>
  );
};

export default RegisterPage;
