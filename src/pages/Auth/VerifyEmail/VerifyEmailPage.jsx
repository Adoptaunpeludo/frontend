//import { useEffect, useState } from "react";
import { TitleSection } from "../../components";
import { verifyEmail } from "../Auth/authService";
import { Button, Link, Spinner } from "@nextui-org/react";
//import { Spinner } from "@nextui-org/spinner";
//import { verifyEmailQuery, useVerifyEmail } from "./useVerifyEmailPage";
import { useLoaderData } from "react-router-dom";
//import { handleNotFoundError } from "../../utils/handleError";

// TODO: Manejo de errors 400 y 500

export const loader = async ({ params }) => {
  try {
    const { token } = params;
    const res = await verifyEmail(token);
    if (res.ok) {
      return {
          succes : true,
          message: res.response.data.message,
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


  const {succes, message } = useLoaderData();

  //const {message, code} = data
  //console.log({ data });
  //const { token } = params;
  //const { data, isLoading, isError } = useVerifyEmail(token);

  //const [counter, setCounter] = useState(1000); // Inicia el contador en 5
  //const [verificationStatus, setVerificationStatus] = useState(null);

  //useEffect(() => {
  //  if (verificationStatus) {
  //    const timer =
  //      counter > 0 && setInterval(() => setCounter(counter - 1), 1000);
  //    if (counter === 0) {
  //      navigate("/login");
  //    }

  //    return () => clearInterval(timer);
  //  }
  //}, [verificationStatus, counter, navigate]);

  return (
    <main className="flex-grow">
      <TitleSection title="Verificación de email" />
      <div className="flex justify-center m-20">
        <div className="bg-white shadow-lg rounded-lg p-8 m-4 max-w-lg w-full mx-auto">
          <h3 className="flex justify-center text-center text-balance">
            { message || <Spinner/>}
          </h3>
          <div className="mt-5 mx-5">
            <p className="text-center">

              
            </p>
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
          {/*)}*/}
        </div>
      </div>
    </main>
  );
};

export default VerifyEmailPage;
