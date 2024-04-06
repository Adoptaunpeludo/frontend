import { useNavigate } from 'react-router-dom';

const NotFoundPage = () => {
  const navigate = useNavigate();

  return (
    <main
      className="text-center flex items-center justify-center flex-grow bg-cover"
      style={{
        backgroundImage: "url('/error/not-found-page.jpg')",
        backgroundOpacity: 0.7,
      }}
    >
      <div className="text-white bg-slate-400 p-4 rounded-md bg-opacity-80">
        <h3 className="mb-2 text-4xl">¡Ohh! ¡Página no encontrada!</h3>
        <p className="leading-7 mt-2 mb-6 text-xl text-foreground text-white">
          No podemos encontrar la página que estás buscando
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

export default NotFoundPage;
