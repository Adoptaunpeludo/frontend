import SheltersIcons from '../components/SheltersIcons';

const shelters = [
  { image: 'rescates-peludos.svg', name: 'rescates peludos' },
  { image: 'patitas-salvadoras.svg', name: 'Patitas salvadoras' },
  { image: 'colitas-rescatadas.svg', name: 'Colitas rescatadas' },
  { image: 'peludos-solidarios.svg', name: 'Peludos solidarios' },
  { image: 'salva-patas.svg', name: 'Salva patas' }
];

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
            {shelters.map((shelter, index) => (
              <SheltersIcons
                key={index}
                image={shelter.image}
                name={shelter.name}
              />
            ))}
          </div>
        </div>
      </main>
    </section>
  );
};
export default FeaturedShelters;
