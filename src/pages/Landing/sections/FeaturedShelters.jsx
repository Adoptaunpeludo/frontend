const FeaturedShelters = () => {
  return (
    <section id='featured-shelters' className='bg-[#E4E4E7] '>
      <main className='max-w-screen-xl w-screen-xl flex flex-col gap-3 h-full items-center  mx-auto px-5 '>
        <div
          id='our-rescues-content'
          className='flex flex-col max-w-screen-xl w-screen h-max my-auto gap-1 '
        >
          <div
            id='our-rescues-title'
            className='font-lobster text-7xl text-secondary flex justify-center text-center '
          >
            Ya han confiado en nosotros
          </div>

          <div
            id='goals'
            className='my-4 max-w-screen-xl w-full flex max-lg:flex-col  justify-evenly px-12 py-12 gap-5'
          >
            <div
              id='shelters-frame'
              className='flex flex-col items-center gap-3'
            >
              <div>
                <img
                  src='/public/shelters/rescates-peludos.svg'
                  alt='rescates peludos'
                />
              </div>
              <div className='text-lg font-medium'>Rescates peludos</div>
            </div>
            <div
              id='shelters-frame'
              className='flex flex-col items-center gap-3'
            >
              <div>
                <img
                  src='/public/shelters/patitas-salvadoras.svg'
                  alt='Patitas salvadoras'
                />
              </div>
              <div className='text-lg font-medium'>Patitas salvadoras</div>
            </div>
            <div
              id='shelters-frame'
              className='flex flex-col items-center gap-3'
            >
              <div>
                <img
                  src='/public/shelters/colitas-rescatadas.svg'
                  alt='Colitas rescatadas'
                />
              </div>
              <div className='text-lg font-medium'>Colitas rescatadas</div>
            </div>
            <div
              id='shelters-frame'
              className='flex flex-col items-center gap-3'
            >
              <div>
                <img
                  src='/public/shelters/peludos-solidarios.svg'
                  alt='Peludos solidarios'
                />
              </div>
              <div className='text-lg font-medium'>Peludos solidarios</div>
            </div>
            <div
              id='shelters-frame'
              className='flex flex-col items-center gap-3'
            >
              <div>
                <img src='/public/shelters/salva-patas.svg' alt='Salva patas' />
              </div>
              <div className='text-lg font-medium'>Salva patas</div>
            </div>
          </div>
        </div>
      </main>
    </section>
  );
};
export default FeaturedShelters;
