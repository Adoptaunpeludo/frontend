const AdoptVsBuy = () => {
  return (
    <section
      id="adopt-vs-buy"
      className=" h-max flex justify-center items-center py-12 bg-black"
    >
      <main className="max-w-screen-xl w-full flex flex-col gap-3 h-full items-center  mx-auto px-5">
        <div
          id="adoptVsBuy-content"
          className="flex flex-col max-w-3xl h-max my-auto gap-3"
        >
          <div
            id="adopt-buy"
            className="font-lobster text-7xl text-primary flex justify-center text-center"
          >
            Adoptar vs Comprar
          </div>
          <div className="font-poppins text-2xl text-white flex justify-center font-semibold">
            Ventajas de adoptar una mascota
          </div>

          <div className="my-4 text-pretty max-w-3xl text-white leading-normal ">
            <p>
              Adoptar un peludo ofrece una experiencia gratificante y
              significativa. Al elegir adoptar en lugar de comprar, no solo
              salvas una vida, sino que también apoyas la causa de rescate
              animal, evitas la cría descontrolada y recibes un compañero lleno
              de gratitud y amor incondicional. ¡Haz la elección responsable
              hoy!
            </p>
          </div>
        </div>
      </main>
    </section>
  );
};
export default AdoptVsBuy;
