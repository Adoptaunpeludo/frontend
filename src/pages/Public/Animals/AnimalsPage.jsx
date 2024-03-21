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
import { Skeleton } from '@nextui-org/react';

export const loader =
  (queryClient, page) =>
  async ({ request }) => {
    const params = Object.fromEntries([
      ...new URL(request.url).searchParams.entries(),
    ]);

    if (params.name) params.name = params.name.toLowerCase();

    //TODO: TryCatch
    await queryClient.ensureQueryData(animalsQuery(page, params));

    return { params };
  };

const AnimalsPage = ({ page }) => {
  const { params } = useLoaderData();
  const navigation = useNavigation();

  const { data } = useAnimals(page, params);

  const isLoading = navigation.state === 'loading';

  return (
    <Skeleton isLoaded={!isLoading}>
      <Banner src={`/backgrounds/banner-${page}.jpg`} />
      <main className="max-w-screen-xl w-full flex  flex-col justify-center  gap-12 h-full  py-12  mx-auto flex-grow">
        <TitleSection title={page === 'cats' ? 'Gatetes' : 'Perretes'} />

        <FilterBar page={page} />
        <ul className="flex justify-center gap-4 flex-wrap p-6">
          {data.animals.map((animal) => (
            <Skeleton isLoaded={!isLoading} key={animal.id}>
              <PetCard key={animal.id} animal={animal} />
            </Skeleton>
          ))}
        </ul>
        <footer className="mx-auto">
          <PagePagination data={data} />
        </footer>
      </main>
    </Skeleton>
  );
};

export default AnimalsPage;
