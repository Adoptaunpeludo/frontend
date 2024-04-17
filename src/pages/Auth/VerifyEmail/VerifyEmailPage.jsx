import { Button, Input, Link, Spinner } from '@nextui-org/react';
import { useState } from 'react';
import { Form, useLoaderData } from 'react-router-dom';
import { H3Title, LogoHeader, Panel } from '../../../components';
import {
  buttonStyleConfig,
  inputStyleConfig,
} from '../../../utils/configFormFields';
import { validateField } from '../../../utils/validateField';
import { action } from './action';

const RenderSuccessMessage = () => (
  <div className="flex justify-center flex-col gap-6 px-10 pt-5 pb-10 w-full">
    <span>Tu email ha sido validado correctamente</span>

    <Button
      as={Link}
      color="primary"
      variant="solid"
      href="/login"
      className={buttonStyleConfig}
    >
      Inicia sesión
    </Button>
  </div>
);
action;
const RenderErrorMessage = () => {
  const [error, setError] = useState('');

  const handleChange = (event) => {
    const { value } = event.target;
    setError(validateField('email', value));
  };

  return (
    <Form
      method="post"
      className=" flex justify-center flex-col gap-6 px-10 pt-5 pb-10 w-full "
      action={action}
    >
      <span className="text-pretty px-3">
        Hubo un error al validar tu cuenta, por favor introduce tu correo para
        volver a intentarlo:
      </span>

      <Input
        placeholder="Introduce tu email"
        type="email"
        label="Email"
        name="email"
        onChange={handleChange}
        color={error ? 'danger' : 'none'}
        errorMessage={error}
        classNames={inputStyleConfig}
        isRequired
      />

      <Button
        // ? TODO: Manage Disable button state?
        type="submit"
        color="primary"
        variant="solid"
        size="lg"
        className={buttonStyleConfig}
      >
        Enviar
      </Button>
    </Form>
  );
};

const VerifyEmailPage = () => {
  const data = useLoaderData();
  console.log({ data });
  const { success, message } = data;

  return (
    <main className="bg-default-100 flex-grow">
      <section
        id="ResetPassword"
        className="max-w-screen-xl w-full flex flex-col gap-3 justify-center py-10 mx-auto  "
      >
        <LogoHeader className={'mx-auto'} />
        <Panel className={'max-w-md mx-auto flex-col '}>
          <H3Title title={message || <Spinner />} className="px-14 pt-8 " />
          {success ? <RenderSuccessMessage /> : <RenderErrorMessage />}
        </Panel>
      </section>
    </main>
  );
};

export default VerifyEmailPage;

{
  /* <main className="flex-1 flex flex-col items-center justify-center">
  <TitleSection className="w-full" title="Verificación de email" />
  <div className="flex-1 w-full flex justify-center items-center">
    <div className="bg-white shadow-lg rounded-lg p-8 mx-auto my-8 max-w-lg w-full">
      <h3 className="flex justify-center text-center text-balance">
        {message || <Spinner />}
      </h3>
      {success ? <RenderSuccessMessage /> : <RenderErrorMessage />}
    </div>
  </div>
</main>; */
}
