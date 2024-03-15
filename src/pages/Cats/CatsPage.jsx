import { Spinner } from '@nextui-org/spinner';
import { FilterBar, PetCard, TitleSection, Banner } from '../../components';
import { animalsQuery, useAnimals } from '../Landing/useAnimals';
//import { Spinner } from '@nextui-org/react';

export const loader =
  (queryClient) =>
  async ({ request }) => {
    const params = Object.fromEntries([
      ...new URL(request.url).searchParams.entries(),
    ]);

    console.log({ params });

    queryClient.invalidateQueries({
      queryKeys: ['animals', 'cats'],
    });
    await queryClient.ensureQueryData(animalsQuery('cats', params));

    return null;
  };

const CatsPage = () => {
  const { data, isLoading } = useAnimals('cats');

  return (
    <main>
      <Banner src={'/backgrounds/banner-cats.jpg'} />
      <TitleSection title="Gatetes" />

      <FilterBar />

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
