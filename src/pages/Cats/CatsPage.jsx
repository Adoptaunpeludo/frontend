import { Spinner } from '@nextui-org/spinner';
import { FilterBar, PetCard, TitleSection, Banner } from '../../components';
import { animalsQuery, useAnimals } from '../Landing/useAnimals';
import { useLoaderData } from 'react-router';
import { useNavigation } from 'react-router-dom';

export const loader =
  (queryClient) =>
  async ({ request }) => {
    const params = Object.fromEntries([
      ...new URL(request.url).searchParams.entries(),
    ]);

    await queryClient.ensureQueryData(animalsQuery('cats', params));

    return { params };
  };

const CatsPage = () => {
  const { params } = useLoaderData();
  const navigation = useNavigation();

  const { data } = useAnimals('cats', params);

  const isLoading = navigation.state === 'loading';

  return (
    <main>
      <Banner src={'/backgrounds/banner-cats.jpg'} />
      <TitleSection title="Gatetes" />

      <FilterBar page="cats" />

      {isLoading ? (
        <Spinner className="flex justify-center items-center" />
      ) : (
        <ul className="flex justify-center gap-4 flex-wrap p-6 ">
          {data.animals.map((animal) => (
            <PetCard key={animal.id} animal={animal} />
          ))}
        </ul>
      )}
    </main>
  );
};

export default CatsPage;
