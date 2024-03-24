import { Spinner } from '@nextui-org/react';
import { Goals } from '../../../../components';
import { useAnimals } from '../useAnimals';
const OurRescues = () => {
  const { data, isLoading } = useAnimals('all');

  if (isLoading) return <Spinner />;

  const rescues = [
    { image: 'adopted.svg', number: data?.adopted, label: 'Adoptados' },
    { image: 'foster.svg', number: data?.fostered, label: 'En acogida' },
    {
      image: 'waiting.svg',
      number: data?.awaitingHome,
      label: 'Esperando un hogar',
    },
  ];
  return (
    <section id="our-rescues" className="bg-[#E4E4E7] ">
      <main className="max-w-screen-xl w-screen-xl flex flex-col gap-3 h-full items-center  mx-auto px-5 ">
        <div
          id="our-rescues-content"
          className="flex flex-col max-w-screen-xl w-screen h-max my-auto gap-1 "
        >
          <div
            id="our-rescues-title"
            className="font-lobster text-7xl text-secondary flex justify-center text-center "
          >
            Nuestros rescatados
          </div>
          <div className="font-poppins text-2xl flex justify-center font-bold ">
            Adopción y cuidado continuo
          </div>
          <Goals rescues={rescues} />
        </div>
      </main>
    </section>
  );
};
export default OurRescues;
