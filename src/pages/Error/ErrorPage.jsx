import { Button, Image, Link } from '@nextui-org/react';
import { IconMail } from '@tabler/icons-react';
import { useQueryClient } from '@tanstack/react-query';
import { Navigate, useRouteError } from 'react-router-dom';
import { H2Title } from '../../components';
import { buttonStyleConfig } from '../../utils/configFormFields';

const Error = () => {
  const error = useRouteError();
  const queryClient = useQueryClient();

  console.log({ error });

  if (error?.response?.status === 401) {
    queryClient.removeQueries([
      'user',
      'user-favs',
      'user-animals',
      'notifications',
    ]);
    return <Navigate to="/login" />;
  }

  if (error?.status === 404 || error?.response?.status === 404) {
    return <Navigate to="/404" />;
  } else
    return (
      <main className="text-center flex items-center justify-center flex-grow bg-contain h-dvh bg-white">
        <section className="max-w-[80vw] max-h-[80vh] w-full h-full  bg-no-repeat bg-center mx-auto flex items-center justify-center">
          <div className="max-w-xl flex flex-col justify-center ">
            <Image src="/error/error-page.jpg" />

            <H2Title title="Algo no ha ido bien..." className="normal-case" />
            <span className="leading-7 mt-2 text-xl text-foreground font-poppins">
              Estamos experimentando problemas técnicos. Inténtelo de nuevo
              pasados unos minutos, si el problema persiste
            </span>

            <Link
              href="mailto:neddry@adoptaunpeludo.com"
              isExternal
              className="text-tertiary flex justify-center"
            >
              <IconMail className="stroke-tertiary size-8" stroke={1} />
              <span className="text-xl font-medium">Contacte con soporte</span>
            </Link>
            <div>
              <Button
                className={`${buttonStyleConfig} mt-5 max-w-52 `}
                color="primary"
                size="lg"
                as={Link}
                href={'/'}
              >
                Sácame de aquí
              </Button>
            </div>
          </div>
        </section>
      </main>
    );
};
export default Error;
