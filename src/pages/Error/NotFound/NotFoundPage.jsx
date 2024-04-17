import { Button, Image, Link } from '@nextui-org/react';
import { useNavigate } from 'react-router-dom';
import { H2Title } from '../../../components';
import { buttonStyleConfig } from '../../../utils/configFormFields';

const NotFoundPage = () => {
  const navigate = useNavigate();

  return (
    <main className="text-center flex items-center justify-center flex-grow   bg-white">
      <section className=" w-full   mx-auto flex items-center justify-center pb-10">
        <div className="max-w-xl flex flex-col justify-center ">
          <Image src="/error/not-found-page.jpg" />

          <H2Title
            title="¡Ohh! ¡Página no encontrada! "
            className="normal-case"
          />
          <span className="leading-7 mt-2 text-xl text-foreground font-poppins">
            No podemos encontrar la página que estás buscando.
          </span>

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

export default NotFoundPage;

//  <main
//    className="text-center flex items-center justify-center flex-grow bg-cover"
//    style={{
//      backgroundImage: "url('/error/not-found-page.jpg')",
//      backgroundOpacity: 0.7,
//    }}
//  >
//    <div className="text-white bg-primary p-4 rounded-md bg-opacity-80">
//      <h3 className="mb-2 text-4xl">¡Ohh! ¡Página no encontrada!</h3>
//      <p className="leading-7 mt-2 mb-6 text-xl text-foreground text-white">
//
//      </p>
//      <button
//        className="text-tertiary capitalize bg-white px-4 py-2 rounded-lg"
//        onClick={() => navigate('/')}
//      >
//        Sácame de aquí
//      </button>
//    </div>
//  </main>;
