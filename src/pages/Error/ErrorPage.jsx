import { useQueryClient } from '@tanstack/react-query';
import { Navigate, useNavigate, useRouteError } from 'react-router-dom';
// import img from '../assets/images/not-found.svg';
const Error = () => {
  const error = useRouteError();
  const queryClient = useQueryClient();
  const navigate = useNavigate();

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
      // <section className="text-center flex items-center justify-center flex-grow">
      //   <h3 className="mb-2">Algo no ha ido bien...</h3>
      //   <p className="leading-6 mt-2 mb-4 text-foreground">Ha ocurrido un error inesperado: {error.message}</p>
      //   <Link className="text-tertiary capitalize" to="/">
      //     De vuelta a casa
      //   </Link>
      // </section>
      <main
        className="text-center flex items-center justify-center flex-grow bg-cover h-dvh w-dvw"
        style={{
          backgroundImage: "url('/error/error-page.jpg')",
          backgroundOpacity: 0.7,
        }}
      >
        <div className="text-white bg-primary p-4 rounded-md bg-opacity-80">
          <h3 className="mb-2 text-4xl">Algo no ha ido bien...</h3>
          <p className="leading-7 mt-2 mb-6 text-xl text-foreground text-white">
            Ha ocurrido un error inesperado: {error.message}
          </p>
          <button
            className="text-tertiary capitalize bg-white px-4 py-2 rounded-lg"
            onClick={() => navigate('/')}
          >
            Sácame de aquí
          </button>
        </div>
      </main>
    );
};
export default Error;
