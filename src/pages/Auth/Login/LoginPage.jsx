import { Button, Input } from "@nextui-org/react";
import { IconLogin2 as LoginIcon } from "@tabler/icons-react";
import { Link } from "react-router-dom";
import { Hero, LogoHeader, Panel } from "../../../components/shared";
import { useState } from "react";
import { login } from "../../Auth/authService";
import { useNavigate } from "react-router-dom";

//import { useNavigate } from "react-router-dom";

//import { useAuthHandlers } from "../../Auth/AuthContextProvider";

const LoginPage = () => {
  const [credentials, setCredentials] = useState({
    email: "foyone@gmail.es",
    password: "P@ssw0rd",
  });

  const navigate = useNavigate();

  const handleSubmit = async (event) => {
    event.preventDefault();
    const response = await login(credentials);
    if (response.success) {
      navigate("/");
    }
  };

  const handleCredentials = (event) => {
    setCredentials((currentCredentials) => ({
      ...currentCredentials,
      [event.target.name]: event.target.value, // Name prop needed on inputs
    }));
    console.log(credentials);
  };

  return (
    <>
      <main className="bg-default-100">
        <Hero />
        <section
          id="login"
          className="max-w-screen-xl w-full flex flex-col gap-3 h-full justify-center py-12 mx-auto "
        >
          <LogoHeader />
          <Panel>
            <form
              className="flex flex-col gap-6 max-w-lg mx-auto px-10 py-8"
              onSubmit={handleSubmit}
            >
              <div>Inicia sesión en tu cuenta para continuar</div>
              <div className="flex flex-col gap-3">
                {/* TODO: useInput hook to custom all inputs with the same styles */}
                <Input
                  onChange={handleCredentials}
                  type="email"
                  label="email"
                  name="email"
                  placeholder="Introduce tu email"
                  value={credentials.email}
                ></Input>
                <Input
                  onChange={handleCredentials}
                  type="password"
                  name="password"
                  label="Password"
                  placeholder="Introduce tu password"
                  value={credentials.password}
                ></Input>
              </div>
              <div className="flex justify-end">
                <Link>¿Olvidaste tu password?</Link>
              </div>
              <div className="flex justify-center">
                <Button
                  //as={Link}
                  type="submit"
                  color="primary"
                  href="#"
                  variant="solid"
                  size="lg"
                  endContent={<LoginIcon />}
                  className="px-10"
                >
                  Iniciar sesión
                </Button>
              </div>
              <div className="flex justify-between">
                <div>¿Necesitas crear una cuenta?</div>
                <div>
                  <Link to="/register">Regístrate</Link>
                </div>
              </div>
            </form>
          </Panel>
        </section>
      </main>
    </>
  );
};

export default LoginPage;
