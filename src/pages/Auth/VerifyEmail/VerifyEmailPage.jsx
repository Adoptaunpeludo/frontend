import { TitleSection } from '../../../components';
import { verifyEmail } from '../../Auth/authService';
import { Button, Input, Link, Spinner } from '@nextui-org/react';
//import { verifyEmailQuery, useVerifyEmail } from "./useVerifyEmailPage";
import { Form, useLoaderData } from 'react-router-dom';
import { resendValidationEmail } from '../authService';
import Header from '../../Layout/Header';
import Footer from '../../Layout/Footer';

// Error 500 - JWT Malformed
// Error 400 -

// TODO:

export const action = async ({ request }) => {
  const formData = await request.formData();
  const credentials = Object.fromEntries(formData);
  credentials.email = credentials.email.toLowerCase();

  try {
    const { email } = credentials;
    const res = await resendValidationEmail(email);
    console.log({ res });

    if (res.status === 200) {
      const { token } = res.data;
      //return null
      //return redirect(/verify-email/${token});
    }

    if (res.status === 400) {
      throw new Error(res.response.data.message);
    }

    return null;
  } catch (error) {
    console.log({ error });
    return null;
  }
};

export const loader = async ({ params }) => {
  try {
    const { token } = params;
    const res = await verifyEmail(token);
    if (res.status === 200) {
      return {
        succes: true,
        message: res?.data?.message,
      };
    }
    throw new Error(res.response.data.message);
  } catch (error) {
    return {
      succes: false,
      message: error.message,
    };
  }
};

const VerifyEmailPage = () => {
  const data = useLoaderData();
  const { succes, message } = data;

  //debugger
  return (
    <main className="flex-1 flex flex-col items-center justify-center">
      <TitleSection title="Verificación de email" />
      <div className="flex-1 w-full flex justify-center items-center bg-blue-400">
        {/* Contenedor para la caja blanca con máximo tamaño y márgenes automáticos */}
        <div className="bg-white shadow-lg rounded-lg p-8 mx-auto my-8 max-w-lg w-full">
          <h3 className="flex justify-center text-center text-balance">
            {message || <Spinner />}
          </h3>

          {succes ? (
            <>
              <div className="bg-red-500 flex flex-col">
                <div className="mt-5 mx-5">
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
            </>
          ) : (
            <>
              <Form
                method="post"
                className="flex flex-col gap-6 max-w-lg  pt-8"
              >
                <p>
                  Hubo un error al validar tu cuenta, por favor introduce tu
                  correo para volver a intentarlo:
                </p>
                <Input
                  placeholder="Introduce tu email"
                  type="email"
                  label="Email"
                  name="email"
                  value="tanancio@gmail.com"
                />

                <Button
                  //isDisabled={enableButton}
                  type="submit"
                  color="primary"
                  variant="solid"
                  size="lg"
                >
                  Enviar
                </Button>
              </Form>
            </>
          )}
        </div>
      </div>
    </main>
  );
};

export default VerifyEmailPage;
