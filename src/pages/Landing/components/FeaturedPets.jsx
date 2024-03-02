import { Button } from '@nextui-org/react';
import PetCardLanding from '../components/PetCardLanding.jsx';
const FeaturedPets = ({ title, pets }) => {
  return (
    <section className='flex flex-col gap-4 h-max z-30  '>
      <header>
        <h2 className='font-lobster text-5xl text-secondary'>{title}</h2>
      </header>
      <main className='flex flex-col gap-2'>
        {pets.map(({ image, name, age, breed }, index) => (
          <PetCardLanding
            key={index}
            image={image}
            name={name}
            age={age}
            breed={breed}
          />
        ))}
      </main>
      <footer className='mx-auto'>
        <Button size='md' color='primary' className='w-32'>
          <span className='font-lobster text-xl text-white'>Ver todos</span>
        </Button>
      </footer>
    </section>
  );
};
export default FeaturedPets;
