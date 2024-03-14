import { Spinner } from '@nextui-org/spinner';
import { PetCard, TitleSection } from '../../components';
import { useAnimals } from '../Landing/useAnimals';
//import { Spinner } from "@nextui-org/react";

const DogsPage = () => {
  const { data, isLoading } = useAnimals('dogs');

  console.log({ data });

  return (
    <>
      <TitleSection title="Perretes" />

      <ul className="flex justify-center gap-4 flex-wrap p-6 ">
        {isLoading ? (
          <Spinner />
        ) : (
          data.animals.map((animal) => (
            <PetCard key={animal.id} animal={animal} />
          ))
        )}
      </ul>
    </>
  );
};

export default DogsPage;
