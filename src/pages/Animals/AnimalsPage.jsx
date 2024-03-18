import { Spinner } from '@nextui-org/spinner';
import { useLoaderData } from 'react-router';
import { useNavigation } from 'react-router-dom';
import { Banner, FilterBar, PetCard, TitleSection } from '../../components';
import { animalsQuery, useAnimals } from '../Landing/useAnimals';

export const loader =
  (queryClient, page) =>
  async ({ request }) => {
    const params = Object.fromEntries([
      ...new URL(request.url).searchParams.entries()
    ]);

    await queryClient.ensureQueryData(animalsQuery(page, params));

    return { params };
  };

const AnimalsPage = ({ page }) => {
  const { params } = useLoaderData();
  const navigation = useNavigation();

  const { data } = useAnimals(page, params);

  const isLoading = navigation.state === 'loading';

  return (
    <main className='flex-grow'>
      <Banner src={`/backgrounds/banner-${page}.jpg`} />
      <TitleSection title={page === 'cats' ? 'Gatetes' : 'Perretes'} />

      <FilterBar page={page} />

      <ul className='flex justify-center gap-4 flex-wrap p-6'>
        {isLoading ? (
          <Spinner className='flex justify-center items-center' />
        ) : (
          data.animals.map(animal => (
            <PetCard key={animal.id} animal={animal} />
          ))
        )}
      </ul>
    </main>
  );
};

export default AnimalsPage;
