import { TitleSection } from '../../../components';
import { Button, Input } from '@nextui-org/react';
import { Form, redirect, useNavigation } from 'react-router-dom';
import { ForgotPassword } from '../authService';
import { toast } from 'react-toastify';

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
    <main className="flex-1 flex flex-col items-center justify-center">
      <TitleSection className="w-full" title="Recuperación de Contraseña" />
      <div className="flex-1 w-full flex justify-center items-center">
        <div className="bg-white shadow-lg rounded-lg p-8 mx-auto my-8 max-w-lg w-full">
          <p className="flex justify-center text-center text-balance">
            Por favor, introduce tu correo electrónico para restablecer tu
            contraseña
          </p>
          <Form method="post" className="flex flex-col gap-6 max-w-lg pt-8">
            <Input
              placeholder="Introduce tu email"
              type="email"
              label="Email"
              name="email"
              isRequired
              isDisabled={isSubmitting}
            />
            <Button
              type="submit"
              color="primary"
              variant="solid"
              size="lg"
              isLoading={isSubmitting}
            >
              Enviar
            </Button>
          </Form>
        </div>
      </div>
    </main>
  );
};

export default ForgotPasswordPage;
