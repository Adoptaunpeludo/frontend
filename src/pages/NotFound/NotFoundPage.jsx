import { useNavigate } from 'react-router-dom';

const NotFoundPage = () => {
  const navigate = useNavigate();

  return (
    <main className="min-h-screen text-center flex items-center justify-center">
      <div>
        {/* <img src={img} alt="not found" /> */}
        <h3 className="mb-2">Ohh! Página no encontrada!</h3>
        <p className="leading-6 mt-2 mb-4 text-foreground">
          No podemos encontrar la página que estás buscando
        </p>
        <button
          className="text-tertiary capitalize"
          onClick={() => navigate(-1)}
        >
          Ir Atras
        </button>
      </div>
    </main>
  );
};

export default NotFoundPage;
