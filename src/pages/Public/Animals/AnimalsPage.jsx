import { Spinner } from '@nextui-org/spinner';
import { useLoaderData } from 'react-router';
import { useNavigation } from 'react-router-dom';

import {
  Banner,
  FilterBar,
  PagePagination,
  PetCard,
  TitleSection,
} from '../../../components';

import { animalsQuery, useAnimals } from '../Landing/useAnimals';

export const loader =
  (queryClient, page) =>
  async ({ request }) => {
    const params = Object.fromEntries([
      ...new URL(request.url).searchParams.entries(),
    ]);

    if (params.name) params.name = params.name.toLowerCase();

    await queryClient.ensureQueryData(animalsQuery(page, params));

    return { params };
  };

const AnimalsPage = ({ page }) => {
  const { params } = useLoaderData();
  const navigation = useNavigation();

  const { data } = useAnimals(page, params);

  const isLoading = navigation.state === 'loading';

  return (
    <>
      <Banner src={`/backgrounds/banner-${page}.jpg`} />
      <main className="max-w-screen-xl w-full flex  flex-col justify-center  gap-12 h-full  py-12  mx-auto">
        <TitleSection title={page === 'cats' ? 'Gatetes' : 'Perretes'} />
        <FilterBar page={page} />
        <ul className="flex justify-center gap-4 flex-wrap p-6">
          {isLoading ? (
            <Spinner className="flex justify-center items-center" />
          ) : (
            data.animals.map((animal) => (
              <PetCard key={animal.id} animal={animal} />
            ))
          )}
        </ul>
        <footer className="mx-auto">
          <PagePagination data={data} />
        </footer>
      </main>
    </>
  );
};

export default AnimalsPage;
