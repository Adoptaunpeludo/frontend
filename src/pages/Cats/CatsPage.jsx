import { Spinner } from '@nextui-org/spinner';
import { FilterBar, PetCard, TitleSection, Banner } from '../../components';
import { useAnimals } from '../Landing/useAnimals';
//import { Spinner } from '@nextui-org/react';

const CatsPage = () => {
  const { data, isLoading } = useAnimals('cats');

  return (
    <main>
      <Banner src={'/backgrounds/banner-cats.jpg'} />
      <TitleSection title="Gatetes" />

      <FilterBar></FilterBar>

      <ul className="flex justify-center gap-4 flex-wrap p-6 ">
        {isLoading ? (
          <Spinner />
        ) : (
          data.animals.map((animal) => (
            <PetCard key={animal.id} animal={animal} />
          ))
        )}
      </ul>
    </main>
  );
};

export default CatsPage;
