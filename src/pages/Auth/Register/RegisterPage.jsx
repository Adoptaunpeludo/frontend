import {
  Button,
  Input,
  Radio,
  RadioGroup,
  Skeleton,
  Spinner,
} from '@nextui-org/react';
import { GoogleLogin } from '@react-oauth/google';
import {
  IconBrandGoogle,
  IconMail,
  IconLogin2 as LoginIcon,
} from '@tabler/icons-react';
import { useQueryClient } from '@tanstack/react-query';
import { useState } from 'react';
import { Form, Link, useNavigate, useNavigation } from 'react-router-dom';
import { toast } from 'react-toastify';

import { H2Title, LogoHeader, Panel } from '../../../components';
import {
  inputStyleConfig,
  radioGroupStyleConfig,
  radioStyleConfig,
} from '../../../utils/configFormFields';
import { validateField } from '../../../utils/validateField';

import { googleAuthRegister } from '../authService';
import { action } from './action';

const RegisterPage = () => {
  const [credentials, setCredentials] = useState({});
  const [errors, setErrors] = useState({});
  const [isLoadingOauth, setIsLoadingOauth] = useState(false);

  const navigation = useNavigation();
  const navigate = useNavigate();
  const queryClient = useQueryClient();

  const isSubmitting = navigation.state === 'submitting';
  const isLoading = navigation.state === 'loading';

  const handleChange = (event) => {
    const { name, value } = event.target;
    setCredentials((prevCredentials) => ({
      ...prevCredentials,
      [name]: value,
    }));
    setErrors({
      ...errors,
      [name]: validateField(name, value, credentials.password),
    });
  };
  const emptyForm = !(
    credentials.username &&
    credentials.email &&
    credentials.password &&
    credentials.repeatPassword
  );
  const isFormValid =
    Object.values(errors).every((error) => error === '') && !emptyForm;
  const enableButton = isFormValid;

  const responseMessage = async (response) => {
    if (!credentials?.role)
      return toast.error('Selecciona un tipo de perfil por favor');
    try {
      setIsLoadingOauth(true);
      const { credential, clientId } = response;
      await googleAuthRegister(credential, clientId, credentials.role);
      localStorage.setItem('isLoggedIn', true);
      queryClient.invalidateQueries({
        queryKey: ['user'],
      });
      queryClient.invalidateQueries({
        queryKey: ['user-notifications'],
      });
      setIsLoadingOauth(false);
      navigate('/');
    } catch (error) {
      console.log(error);
      setIsLoadingOauth(false);
    }
  };

  const errorMessage = (error) => {
    setIsLoadingOauth(false);
    console.log(error);
  };
  const [loginOrigin, setLoginOrigin] = useState('');
  const onPressLoginOrigin = (origin) => {
    setLoginOrigin(origin);
  };

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
              action={action}
            >
              <H2Title title={'Registro'} className={'mx-auto'} />
              {(isSubmitting || isLoadingOauth) && <Spinner />}
              <RadioGroup
                name="role"
                label="Selecciona tu perfil"
                orientation="horizontal"
                errorMessage={errors.role}
                onChange={handleChange}
                className="mx-auto"
                classNames={radioGroupStyleConfig}
                isDisabled={isSubmitting || isLoadingOauth}
                isRequired
              >
                <Radio
                  value="shelter"
                  classNames={radioStyleConfig}
                  isDisabled={isSubmitting || isLoadingOauth}
                >
                  Protectora
                </Radio>
                <Radio
                  value="adopter"
                  classNames={radioStyleConfig}
                  isDisabled={isSubmitting || isLoadingOauth}
                >
                  Adoptante
                </Radio>
              </RadioGroup>
              <div>Regístrate con:</div>
              <div className="flex gap-4 justify-center">
                <Button
                  isIconOnly
                  radius="full"
                  color="primary"
                  variant="ghost"
                  className="border-primary border-1 w-16 h-16"
                  onPress={() => {
                    onPressLoginOrigin('google');
                  }}
                  isDisabled={isSubmitting || isLoadingOauth}
                >
                  <IconBrandGoogle stroke={1} className="stroke-foreground" />
                </Button>
                <Button
                  isIconOnly
                  radius="full"
                  color="primary"
                  variant="ghost"
                  className="border-primary border-1 w-16 h-16"
                  onPress={() => {
                    onPressLoginOrigin('mail');
                  }}
                  isDisabled={isSubmitting || isLoadingOauth}
                >
                  <IconMail stroke={1} className="stroke-foreground" />
                </Button>
              </div>
              <div
                className={`${
                  loginOrigin === 'google' ? 'flex' : 'hidden'
                } justify-center`}
              >
                <GoogleLogin
                  onSuccess={responseMessage}
                  onError={errorMessage}
                  theme="outline"
                  size="large"
                  text="signin_with"
                  type="standard"
                  shape="pill"
                  width={'100%'}
                  isDisabled={isSubmitting || isLoadingOauth}
                />
              </div>
              <div
                className={` ${loginOrigin === 'mail' ? 'flex' : 'hidden'}
               flex-col w-full gap-4 `}
              >
                <div className="flex w-full flex-wrap md:flex-nowrap gap-4">
                  <Input
                    name="username"
                    isDisabled={
                      !credentials.role || isSubmitting || isLoadingOauth
                    }
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
                    onChange={handleChange}
                    isRequired
                  />

                  <Input
                    name="email"
                    isDisabled={
                      !credentials.role || isSubmitting || isLoadingOauth
                    }
                    className="min-w-72 "
                    classNames={inputStyleConfig}
                    type="email"
                    label="Email"
                    placeholder="Introduce tu email"
                    color={errors.email ? 'danger' : 'none'}
                    errorMessage={errors.email}
                    onChange={handleChange}
                    isRequired
                  />
                </div>
                <div className="flex w-full flex-wrap md:flex-nowrap gap-4">
                  <Input
                    name="password"
                    isDisabled={
                      !credentials.role || isSubmitting || isLoadingOauth
                    }
                    className="min-w-72 "
                    classNames={inputStyleConfig}
                    type="password"
                    label="Password"
                    placeholder="Introduce tu password"
                    color={errors.password ? 'danger' : 'none'}
                    errorMessage={errors.password}
                    onChange={handleChange}
                    isRequired
                  />

                  <Input
                    name="repeatPassword"
                    isDisabled={
                      !credentials.role || isSubmitting || isLoadingOauth
                    }
                    className="min-w-72 "
                    classNames={inputStyleConfig}
                    type="password"
                    label="confirmar password"
                    placeholder="Introduce tu password"
                    color={errors.repeatPassword ? 'danger' : 'none'}
                    errorMessage={errors.repeatPassword}
                    onChange={handleChange}
                    isRequired
                  />
                </div>
                <div className="flex justify-center">
                  <Button
                    isDisabled={!enableButton || isSubmitting || isLoadingOauth}
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
