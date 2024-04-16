import { Button, Input, Spinner, Skeleton } from '@nextui-org/react';
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
  buttonStyleConfig,
  inputStyleConfig,
} from '../../../utils/configFormFields';
import { validateField } from '../../../utils/validateField';
import { googleAuthLogin } from '../authService';
import { action } from './action';

const LoginPage = () => {
  const [credentials, setCredentials] = useState({
    email: '',
    password: '',
  });
  const [isLoadingOauth, setIsLoadingOauth] = useState(false);
  const [errors, setErrors] = useState({});
  const navigation = useNavigation();
  const queryClient = useQueryClient();
  const navigate = useNavigate();

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
      [name]: validateField(name, value),
    });
  };

  const responseMessage = async (response) => {
    try {
      setIsLoadingOauth(true);
      const { credential, clientId } = response;
      await googleAuthLogin(credential, clientId);
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

  const isFormValid = Object.values(errors).every((error) => error === '');
  const enableButton = !(
    credentials.email &&
    credentials.password &&
    isFormValid
  );
  const [loginOrigin, setLoginOrigin] = useState('');
  const onPressLoginOrigin = (origin) => {
    setLoginOrigin(origin);
  };

  return (
    <main className="bg-default-100 flex-grow">
      <Skeleton
        isLoaded={!isLoading}
        className="max-w-screen-xl w-full flex flex-col gap-3 justify-center py-10 mx-auto"
      >
        <section
          id="login"
          className="max-w-screen-xl w-full flex flex-col gap-3 justify-center py-10 mx-auto "
        >
          <LogoHeader className={'mx-auto'} />
          <Panel className={'max-w-md mx-auto'}>
            <Form
              method="post"
              className="flex flex-col gap-6  mx-auto px-10 py-8"
              action={action}
            >
              <H2Title
                title="Inicia sesión "
                className={'normal-case text-center'}
              />
              {(isSubmitting || isLoadingOauth) && <Spinner />}

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
                  isDisabled={isSubmitting || isLoadingOauth}
                />
              </div>
              {/* <div className="flex justify-center pb-5 border-b-1 border-primary">
              O con tu email
            </div> */}
              <div
                className={` ${loginOrigin === 'mail' ? 'flex' : 'hidden'}
               flex-col gap-3 `}
              >
                <Input
                  type="email"
                  label="Email"
                  name="email"
                  placeholder="Introduce tu email"
                  color={errors.email ? 'danger' : 'none'}
                  onChange={handleChange}
                  errorMessage={errors.email}
                  isRequired
                  classNames={inputStyleConfig}
                  isDisabled={isSubmitting || isLoadingOauth}
                />
                <Input
                  type="password"
                  name="password"
                  label="Password"
                  placeholder="Introduce tu password"
                  color={errors.password ? 'danger' : 'none'}
                  errorMessage={errors.password}
                  onChange={handleChange}
                  isRequired
                  classNames={inputStyleConfig}
                  isDisabled={isSubmitting || isLoadingOauth}
                />
                <div className="flex justify-center">
                  <Button
                    isDisabled={enableButton || isSubmitting || isLoadingOauth}
                    type="submit"
                    color="primary"
                    variant="solid"
                    size="lg"
                    endContent={<LoginIcon />}
                    className={buttonStyleConfig}
                  >
                    Iniciar sesión
                  </Button>
                </div>
                <div className="flex justify-end">
                  <Link
                    to="/forgot-password"
                    className="text-tertiary font-poppins"
                  >
                    ¿Olvidaste tu password?
                  </Link>
                </div>
              </div>

              <div className="flex justify-center gap-1 font-medium font-poppins">
                <span>¿Necesitas crear una cuenta?</span>
                <Link to="/register" className="text-tertiary">
                  Regístrate
                </Link>
              </div>
            </Form>
          </Panel>
        </section>
      </Skeleton>
    </main>
  );
};

export default LoginPage;
