import { Button, Checkbox, Input, Radio, RadioGroup } from "@nextui-org/react";
import { IconLogin2 as LoginIcon } from "@tabler/icons-react";
import { Link } from "react-router-dom";

import { Hero, LogoHeader, Panel } from "../../shared";

const RegisterPage = () => {
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
            <form className="flex flex-col gap-6 max-w-4xl mx-auto px-10 py-8">
              <div>Regístrate</div>
              <div id="profile">
                {/* TODO: useRadio hook to custom all inputs with the same styles  */}
                <RadioGroup label="Perfil" orientation="horizontal">
                  <Radio value="shelter">Protectora</Radio>
                  <Radio value="adopter">Adoptante</Radio>
                </RadioGroup>
              </div>

              <div className="flex flex-col w-full gap-4">
                {/* TODO: useInput hook to custom all inputs with the same styles  */}
                <div className="flex w-full flex-wrap md:flex-nowrap gap-4">
                  <Input
                    className="min-w-72 "
                    type="text"
                    label="Nombre de la protectora / adoptante" //TODO: toggle by profile
                    placeholder="Introduce un nombre"
                  ></Input>
                  <Input
                    className="min-w-72 "
                    type="email"
                    label="Email"
                    placeholder="Introduce tu email"
                  ></Input>
                </div>
                <div className="flex w-full flex-wrap md:flex-nowrap gap-4">
                  <Input
                    className="min-w-72 "
                    type="password"
                    label="Password"
                    placeholder="Introduce tu password"
                  ></Input>
                  <Input
                    className="min-w-72 "
                    type="password"
                    label="confirm password"
                    placeholder="Introduce tu password"
                  ></Input>
                </div>
              </div>

              <div className="flex flex-col justify-start">
                {/* TODO: useCheck hook to custom all inputs with the same styles  */}
                <Checkbox checked={false} radius="full">
                  Acepto recibir otras comunicaciones de Adopta un peludo
                </Checkbox>
                <Checkbox checked={false} radius="full">
                  Autorizo a Adopta un peludo a almacenar y procesar mis datos
                  personales
                </Checkbox>
              </div>
              <div className="flex justify-center">
                <Button
                  as={Link}
                  color="primary"
                  href="#"
                  variant="solid"
                  size="lg"
                  endContent={<LoginIcon />}
                  className="px-10"
                >
                  Regístrate
                </Button>
              </div>
              <div className="flex justify-center gap-2">
                <div>¿Ya tienes una cuenta?</div>
                <div>
                  <Link to="/login">Inicia sesión</Link>
                </div>
              </div>
            </form>
          </Panel>
        </section>
      </main>
      {/* TODO: remove div and links */}
      <div className="container">
        <h1>Register Page</h1>
        <br />
        <Link to="/login">Login</Link>
        <br />
        <br />
        <Link to="/">Landing</Link>
      </div>
    </>
  );
};

export default RegisterPage;
