import { TitleSection } from '../../../components';
import { verifyEmail } from '../../Auth/authService';
import { Button, Input, Link, Spinner } from '@nextui-org/react';
import { Form, redirect, useLoaderData } from 'react-router-dom';
import { resendValidationEmail } from '../authService';
import { useState } from 'react';
import { toast } from 'react-toastify';

export const action = async ({ request }) => {
  const formData = await request.formData();
  const credentials = Object.fromEntries(formData);
  credentials.email = credentials.email.toLowerCase();

  try {
    const { email } = credentials;
    console.log(email);
    const res = await resendValidationEmail(email);
    console.log({ res });

    if (res.status === 400) {
      throw new Error(res.response.data.message);
    }
    if (res.status === 500) {
      throw new Error(res.response.data.message);
    }

    toast.success('Email de validacion enviado');

    return redirect('/login');
  } catch (error) {
    console.log({ error });
    toast.error(error.response.data.message);
    return null;
  }
};

export const loader = async ({ params }) => {
  try {
    const { token } = params;
    const res = await verifyEmail(token);
    if (res.status === 200) {
      return {
        success: true,
        message: res?.data?.message,
      };
    }
    throw new Error(res.response.data.message);
  } catch (error) {
    return {
      success: false,
      message: error.message,
    };
  }
};

const RenderSuccessMessage = () => (
  <div className="flex flex-col">
    <div className="mt-5 mx-5">
      <div className="flex justify-center">
        <p>Tu email ha sido validado correctamente</p>
      </div>
      <div className="flex justify-center mt-5">
        <Button
          as={Link}
          className="font-bold "
          color="primary"
          variant="solid"
          href="/login"
        >
          Ir al login
        </Button>
      </div>
    </div>
  </div>
);

const RenderErrorMessage = () => {
  const [isResendingEmail, setIsResendingEmail] = useState(false);

  return (
    <Form method="post" className="flex flex-col gap-6 max-w-lg  pt-8">
      <p>
        Hubo un error al validar tu cuenta, por favor introduce tu correo para
        volver a intentarlo:
      </p>
      <Input
        placeholder="Introduce tu email"
        type="email"
        label="Email"
        name="email"
      />

      <Button
        // ? TODO: Manage Disable button state?
        type="submit"
        color="primary"
        variant="solid"
        size="lg"
        onClick={() => {
          setIsResendingEmail(true);
        }}
      >
        Enviar
      </Button>
      {isResendingEmail && (
        <p className="text-center">Tu mensaje se ha enviado correctamente</p>
      )}
    </Form>
  );
};

const VerifyEmailPage = () => {
  const data = useLoaderData();
  const { success, message } = data;

  return (
    <main className="flex-1 flex flex-col items-center justify-center">
      <TitleSection className="w-full" title="Verificación de email" />
      <div className="flex-1 w-full flex justify-center items-center">
        <div className="bg-white shadow-lg rounded-lg p-8 mx-auto my-8 max-w-lg w-full">
          <h3 className="flex justify-center text-center text-balance">
            {message || <Spinner />}
          </h3>
          {success ? <RenderSuccessMessage /> : <RenderErrorMessage />}
        </div>
      </div>
    </main>
  );
};

export default VerifyEmailPage;
