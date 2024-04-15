import { TitleSection } from '../../../components';
import { Button, Input, Link, Spinner } from '@nextui-org/react';
import { Form, useLoaderData } from 'react-router-dom';
import { useState } from 'react';
import { validateField } from '../../../utils/validateField';
import { action } from './action';

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
action;
const RenderErrorMessage = () => {
  const [isResendingEmail, setIsResendingEmail] = useState(false);
  const [error, setError] = useState('');

  const handleChange = (event) => {
    const { value } = event.target;
    setError(validateField('email', value));
  };

  return (
    <Form
      method="post"
      className="flex flex-col gap-6 max-w-lg  pt-8"
      action={action}
    >
      <p>
        Hubo un error al validar tu cuenta, por favor introduce tu correo para
        volver a intentarlo:
      </p>
      <Input
        placeholder="Introduce tu email"
        type="email"
        label="Email"
        name="email"
        onChange={handleChange}
        color={error ? 'danger' : 'none'}
        errorMessage={error}
        isRequired
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
