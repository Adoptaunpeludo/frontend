import { Spinner } from '@nextui-org/spinner';
import { Banner, FilterBar, PetCard, TitleSection } from '../../components';
import { animalsQuery, useAnimals } from '../Landing/useAnimals';
import { useLoaderData, useNavigation } from 'react-router-dom';

export const loader =
  (queryClient) =>
  async ({ request }) => {
    const params = Object.fromEntries([
      ...new URL(request.url).searchParams.entries(),
    ]);

    await queryClient.ensureQueryData(animalsQuery('dogs', params));

    return { params };
  };

const DogsPage = () => {
  const { params } = useLoaderData();
  const navigation = useNavigation();

  const { data } = useAnimals('dogs', params);

  const isLoading = navigation.state === 'loading';

  return (
    <main>
      <Banner src={'/backgrounds/banner-dogs.jpg'} />
      <TitleSection title="Perretes" />

      <FilterBar page="dogs" />

      <ul className="flex justify-center gap-4 flex-wrap p-6">
        {isLoading ? (
          <Spinner className="flex justify-center items-center" />
        ) : (
          data.animals.map((animal) => (
            <PetCard key={animal.id} animal={animal} />
          ))
        )}
      </ul>
    </main>
  );
};

export default DogsPage;
