import { Link, Navigate, useRouteError } from 'react-router-dom';
// import img from '../assets/images/not-found.svg';
const Error = () => {
  const error = useRouteError();

  console.log({ error });

  if (error.status === 404) {
    return <Navigate to="/404" />;
  } else
    return (
      <div>
        <h3 className="mb-2">Algo no ha ido bien...</h3>
        <p className="leading-6 mt-2 mb-4 text-foreground">{error.message}</p>
        <Link className="text-tertiary capitalize" to="/">
          De vuelta a casa
        </Link>
      </div>
    );
};
export default Error;
