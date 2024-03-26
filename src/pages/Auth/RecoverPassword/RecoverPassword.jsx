//import { TitleSection } from '../../../components';
////import { verifyEmail } from '../authService';
//import { Button, Input, Link, Spinner } from '@nextui-org/react';
////import { verifyEmailQuery, useVerifyEmail } from "./useVerifyEmailPage";
//import { Form, useLoaderData, redirect } from 'react-router-dom';
////import { resendValidationEmail } from '../authService';


////export const action = async ({ request }) => {
////  const formData = await request.formData();
////  const credentials = Object.fromEntries(formData);
////  credentials.email = credentials.email.toLowerCase();

////  try {
////    const { email } = credentials;
////    const res = await resendValidationEmail(email);
////    console.log({ res });

////    if (res.status === 200) {
////      const { token } = res.data;
////      //return null
////      //return redirect(`/verify-email/${token}`);
////    }

////    if (res.status === 400) {
////      throw new Error(res.response.data.message);
////    }

////    return null;
////  } catch (error) {
////    console.log({ error });
////    return null;
////  }
////};

////export const loader = async ({ params }) => {
////  try {
////    const { token } = params;
////    const res = await verifyEmail(token);
////    if (res.status === 200) {
////      return {
////        succes: true,
////        message: res?.data?.message,
////      };
////    }
////    throw new Error(res.response.data.message);
////  } catch (error) {
////    return {
////      succes: false,
////      message: error.message,
////    };
////  }
////};
//const RecoverPassword = () => {
//  // Utilizamos useLoaderData() para obtener cualquier dato necesario, aunque en este caso podría no ser necesario.
//  // const data = useLoaderData();

//  return (
//      <main className="flex-1 flex flex-col items-center justify-center">
//        <TitleSection title="Recuperación de Contraseña" />
//        <div className="flex-1 w-full flex justify-center items-center bg-blue-400">
//          <div className="bg-white shadow-lg rounded-lg p-8 mx-auto my-8 max-w-lg w-full">
//            <p className="flex justify-center text-center text-balance">
//              Por favor, introduce tu correo electrónico para restablecer tu contraseña
//            </p>
//            <Form
//              method="post"
//              className="flex flex-col gap-6 max-w-lg pt-8"
//            >
//              <Input
//                placeholder="Introduce tu email"
//                type="email"
//                label="Email"
//                name="email"
//                // Es posible que desees eliminar el valor predeterminado para el campo de correo electrónico
//                // value="tanancio@gmail.com"
//              />
//              <Button
//                // Comentamos la propiedad isDisabled ya que podría no ser necesaria en este contexto
//                // isDisabled={enableButton}
//                type="submit"
//                color="primary"
//                variant="solid"
//                size="lg"
//              >
//                Enviar
//              </Button>
//            </Form>
//          </div>
//        </div>
//      </main>
//  );
//};

//export default RecoverPassword;
