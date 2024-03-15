import { Button, Link } from '@nextui-org/react';
import { BUCKET_URL_ANIMALS } from '../../../config/config.js';
import PetCardLanding from '../components/PetCardLanding.jsx';
const FeaturedPets = ({ title, pets }) => {
  return (
    <section className='flex flex-col gap-4 h-max z-30  '>
      <header>
        <h2 className='font-lobster text-5xl text-secondary'>{title}</h2>
      </header>
      <main className='flex flex-col gap-2'>
        {pets.map(({ images, name, age, breed, slug, type }, index) => (
          <PetCardLanding
            key={index}
            image={`${BUCKET_URL_ANIMALS}/${images[0]}`}
            name={name}
            age={age}
            breed={breed}
            slug={slug}
            type={type}
          />
        ))}
      </main>
      <footer className='mx-auto'>
        <Button
          as={Link}
          href={title === 'Gatetes' ? '/cats' : '/dogs'}
          size='md'
          color='primary'
          className='w-32'
        >
          <span className='font-lobster text-xl text-white'>Ver todos</span>
        </Button>
      </footer>
    </section>
  );
};
export default FeaturedPets;
