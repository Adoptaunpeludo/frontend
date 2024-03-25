import { Outlet, useNavigate, useOutletContext } from 'react-router-dom';
import { toast } from 'react-toastify';

const ProtectedRoute = () => {
  const { user } = useOutletContext();
  const navigate = useNavigate();

  if (!user) {
    toast.error('Por favor, primero loguea con tu cuenta');
    navigate('/login');
  }

  return <Outlet />;
};

export default ProtectedRoute;
