import { Button, Input } from '@nextui-org/react';
import { Form, redirect, useNavigation } from 'react-router-dom';
import { toast } from 'react-toastify';
import { H3Title, LogoHeader, Panel } from '../../../components';
import {
  buttonStyleConfig,
  inputStyleConfig,
} from '../../../utils/configFormFields';
import { ForgotPassword } from '../authService';

export const action = async ({ request }) => {
  const formData = await request.formData();
  const credentials = Object.fromEntries(formData);
  credentials.email = credentials.email.toLowerCase();

  try {
    const { email } = credentials;
    const res = await ForgotPassword(email);

    if (res.status === 400) {
      throw new Error(res.response.data.message);
    }
    if (res.status === 500) {
      throw new Error(res.response.data.message);
    }
    toast.success('Email para resetear el password enviado');
    return redirect('/login');
  } catch (error) {
    console.log({ error });
    toast.error(error.response.data.message);
    return null;
  }
};

const ForgotPasswordPage = () => {
  const navigation = useNavigation();

  const isSubmitting = navigation.state === 'submitting';

  return (
    <main className="bg-default-100 flex-grow">
      <section
        id="ResetPassword"
        className="max-w-screen-xl w-full flex flex-col gap-3 justify-center py-10 mx-auto  "
      >
        <LogoHeader className={'mx-auto'} />
        <Panel className={'max-w-md mx-auto'}>
          <Form
            method="post"
            className="flex flex-col gap-6  mx-auto px-10 py-8"
          >
            <H3Title
              title="Por favor, introduce tu correo electrónico para restablecer tu
                contraseña"
              className={'normal-case text-pretty'}
            />
            <div className="flex flex-col gap-3">
              <Input
                placeholder="Introduce tu email"
                type="email"
                label="Email"
                name="email"
                isRequired
                isDisabled={isSubmitting}
                classNames={inputStyleConfig}
              />
              <Button
                type="submit"
                color="primary"
                variant="solid"
                size="lg"
                isLoading={isSubmitting}
                className={buttonStyleConfig}
              >
                Enviar
              </Button>
            </div>
          </Form>
        </Panel>
      </section>
    </main>
  );
};

export default ForgotPasswordPage;
