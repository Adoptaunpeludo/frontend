import { Link, useRouteError } from 'react-router-dom';
// import img from '../assets/images/not-found.svg';
const Error = () => {
  const error = useRouteError();
  console.log(error);
  if (error.status === 404) {
    return (
      <main className="min-h-screen text-center flex items-center justify-center">
        <div>
          {/* <img src={img} alt="not found" /> */}
          <h3 className="mb-2">Ohh! Página no encontrada!</h3>
          <p className="leading-6 mt-2 mb-4 text-foreground">
            No podemos encontrar la página que estás buscando
          </p>
          <Link className="text-tertiary capitalize" to="/">
            De vuelta a casa
          </Link>
        </div>
      </main>
    );
  }
  return (
    <div>
      <h3 className="mb-2">Algo no ha ido bien...</h3>
      <p className="leading-6 mt-2 mb-4 text-foreground">{error}</p>
      <Link className="text-tertiary capitalize" to="/">
        De vuelta a casa
      </Link>
    </div>
  );
};
export default Error;
