import { Button, Input, Spinner } from '@nextui-org/react';
import { GoogleLogin } from '@react-oauth/google';
import { IconLogin2 as LoginIcon } from '@tabler/icons-react';
import { useQueryClient } from '@tanstack/react-query';
import { useState } from 'react';
import {
  Form,
  Link,
  redirect,
  useNavigate,
  useNavigation,
} from 'react-router-dom';
import { toast } from 'react-toastify';
import { H2Title, LogoHeader, Panel } from '../../../components';
import {
  buttonStyleConfig,
  inputStyleConfig,
} from '../../../utils/configFormFields';
import { handleAuthError } from '../../../utils/handleError';
import { validateField } from '../../../utils/validateField';
import { googleAuthLogin, login } from '../authService';

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
  const [isLoadingOauth, setIsLoadingOauth] = useState(false);
  const [errors, setErrors] = useState({});
  const navigation = useNavigation();
  const queryClient = useQueryClient();
  const navigate = useNavigate();

  const isLoading = navigation.state === 'submitting';

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
      toast.error(error.response.data.message);
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

  return (
    <main className="bg-default-100 flex-grow">
      <section
        id="login"
        className="max-w-screen-xl w-full flex flex-col gap-3 justify-center py-10 mx-auto  "
      >
        <LogoHeader className={'mx-auto'} />
        <Panel className={'max-w-md mx-auto'}>
          <Form
            method="post"
            className="flex flex-col gap-6  mx-auto px-10 py-8"
          >
            <H2Title
              title="Inicia sesión "
              className={'normal-case text-center'}
            />
            {(isLoading || isLoadingOauth) && <Spinner />}
            <div className="flex justify-center">
              <GoogleLogin
                onSuccess={responseMessage}
                onError={errorMessage}
                theme="outline"
                size="large"
                text="signin_with"
                type="standard"
                shape="pill"
              />
            </div>
            <div className="flex justify-center pb-5 border-b-1 border-primary">
              O con tu email
            </div>
            <div className="flex flex-col gap-3 ">
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
                isDisabled={isLoading}
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
                isDisabled={isLoading}
              />
            </div>

            <div className="flex justify-center">
              <Button
                isDisabled={enableButton || isLoading}
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
            <div className="flex justify-center gap-1 font-medium font-poppins">
              <span>¿Necesitas crear una cuenta?</span>
              <Link to="/register" className="text-tertiary">
                Regístrate
              </Link>
              <div></div>
            </div>
          </Form>
        </Panel>
      </section>
    </main>
  );
};

export default LoginPage;
