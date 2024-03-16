import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { TitleSection } from "../../components";
import { useLocation } from "react-router-dom";
import { verifyEmail } from "../Auth/authService";
import { Button } from "@nextui-org/react";
import { Spinner } from "@nextui-org/spinner";

const VerifyEmailPage = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const queryParams = new URLSearchParams(location.search);
  const token = queryParams.get("token");
  const [counter, setCounter] = useState(1000); // Inicia el contador en 5
  const [verificationStatus, setVerificationStatus] = useState(null);

  useEffect(() => {
    if (token) {
      const fetchVerifyEmail = async () => {
        try {
          const response = await verifyEmail(token);
          if (!response.token) {
            throw new Error("El token no es válido o ha ocurrido un error");
          }
          setVerificationStatus("Has validado tu correo correctamente");
          console.log(response);
        } catch (error) {
          console.log(error.message);
          setVerificationStatus(error.message);
        }
      };

      fetchVerifyEmail();
    }
  }, [token]);

  useEffect(() => {
    if (verificationStatus) {
      const timer =
        counter > 0 && setInterval(() => setCounter(counter - 1), 1000);
      if (counter === 0) {
        navigate("/login");
      }

      return () => clearInterval(timer);
    }
  }, [verificationStatus, counter, navigate]);

  return (
    <main>
      <TitleSection title="Verificación de email" />
      <div className="flex justify-center m-20">
        <div className="bg-white shadow-lg rounded-lg p-8 m-4 max-w-lg w-full mx-auto">
          <h3 className="flex justify-center text-center text-balance">
            {verificationStatus || <Spinner />}
          </h3>
          {verificationStatus && (
            <div className="mt-5 mx-5">
              <p className="text-center">
                En {counter} segundos serás redirigido a la página de login.
              </p>
              <div className="flex justify-center mt-5">
                <Button
                  className="font-bold "
                  color="primary"
                  variant="solid"
                  onClick={() => navigate("/login")}
                >
                  Ir al login
                </Button>
              </div>
            </div>
          )}
        </div>
      </div>
    </main>
  );
};

export default VerifyEmailPage;
