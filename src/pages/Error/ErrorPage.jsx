import { useEffect } from 'react';
import { Link, useNavigate, useRouteError } from 'react-router-dom';
// import img from '../assets/images/not-found.svg';
const Error = () => {
  const error = useRouteError();
  const navigate = useNavigate();

  console.log(error.status);

  useEffect(() => {
    console.log('404');
    if (error.status === 404) return navigate('/404');
  }, [error.status, navigate]);

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
