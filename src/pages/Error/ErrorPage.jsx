import { useQueryClient } from '@tanstack/react-query';
import { Link, Navigate, useRouteError } from 'react-router-dom';
import { toast } from 'react-toastify';
// import img from '../assets/images/not-found.svg';
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
    toast.error('No autenticado, haz login');
    return <Navigate to="/login" />;
  }

  if (error?.status === 404 || error?.response?.status === 404) {
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
