import { FilterBar, PetCard, TitleSection } from '../shared';
import { useAnimals } from '../Landing/useAnimals';
import { Spinner } from '@nextui-org/react';

const CatsPage = () => {
  const { data, isLoading } = useAnimals('cats');

  return (
    <main>
      <Banner src={"/backgrounds/banner-cats.jpg"} />
      <TitleSection title="Gatetes" />

      <FilterBar></FilterBar>

      <ul className="flex justify-center gap-4 flex-wrap p-6 ">
        {animals.map((animal) => (
          <PetCard key={animal.id} animal={animal} />
        ))}
      </ul>
    </>
  );
};

export default CatsPage;
