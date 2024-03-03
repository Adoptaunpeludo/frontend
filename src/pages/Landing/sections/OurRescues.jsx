import RescuesIcons from '../components/RescuesIcons';
const rescues = [
  { image: 'adopted.svg', number: 99, label: 'Adoptados' },
  { image: 'foster.svg', number: 99, label: 'En acogida' },
  { image: 'waiting.svg', number: 99, label: 'Esperando un hogar' }
];
const OurRescues = () => {
  return (
    <section id='our-rescues' className='bg-[#E4E4E7] '>
      <main className='max-w-screen-xl w-screen-xl flex flex-col gap-3 h-full items-center  mx-auto px-5 '>
        <div
          id='our-rescues-content'
          className='flex flex-col max-w-screen-xl w-screen h-max my-auto gap-1 '
        >
          <div
            id='our-rescues-title'
            className='font-lobster text-7xl text-secondary flex justify-center text-center '
          >
            Nuestros rescatados
          </div>
          <div className='font-poppins text-2xl flex justify-center font-bold '>
            Adopción y cuidado continuo
          </div>

          <div
            id='goals'
            className='my-4 max-w-screen-xl w-full flex max-lg:flex-col  justify-evenly px-12 py-12 gap-5'
          >

            {rescues.map((rescue, index) => (
              <RescuesIcons
                key={index}

                image={rescue.image}
                number={rescue.number}
                label={rescue.label}
              />
            ))}
          </div>
        </div>
      </main>
    </section>
  );
};
export default OurRescues;
