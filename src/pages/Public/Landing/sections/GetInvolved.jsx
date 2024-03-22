const GetInvolved = () => {
  return (
    <section
      id="get-involved"
      className=" h-max flex justify-center items-center py-12 bg-white"
    >
      <main className="max-w-screen-xl w-full flex flex-col gap-3 h-full items-center  mx-auto px-5">
        <div
          id="getInvolved-content"
          className="flex flex-col max-w-3xl h-max my-auto gap-1"
        >
          <div
            id="Save-a-furry"
            className="font-lobster text-7xl text-secondary flex justify-center text-center"
          >
            Salva un peludo
          </div>
          <div className="font-poppins text-2xl flex justify-center font-bold">
            Adopta una mascota
          </div>

          <div className="my-4 text-pretty max-w-3xl">
            <p className="text-balance leading-normal ">
              Imagina el brillo de agradecimiento en los ojos de tu nuevo amigo
              peludo cuando lo lleves a casa. En Adopta un Peludo, no solo estás
              salvando una vida, estás transformando una historia de abandono en
              un cuento de amor y lealtad. Con tu apoyo, cada animal encuentra
              un hogar lleno de amor y seguridad. ¡Adopta hoy y sé parte de esta
              hermosa historia de rescate y esperanza!
            </p>
          </div>
        </div>
      </main>
    </section>
  );
};
export default GetInvolved;
