import { useLoaderData } from 'react-router';
import { useNavigation } from 'react-router-dom';

import { Skeleton } from '@nextui-org/react';
import { FilterBar, PagePagination, TitleSection } from '../../../components';
import { handleNotFoundError } from '../../../utils/handleError';
import { animalsQuery, useAnimals } from '../Landing/useAnimals';
import {
  shelterAnimalsQuery,
  useShelterAnimals,
} from '../Shelters/ShelterDetails/useShelterDetails';
import { PetCard } from './components/PetCard';

export const loaderAnimals =
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

export const loaderShelterAnimals =
  (queryClient) =>
  async ({ params }) => {
    console.log({ params });
    try {
      const { id } = params;
      await queryClient.ensureQueryData(shelterAnimalsQuery(id));
      return params;
    } catch (error) {
      if (error.response.status === 404) {
        const notFoundError = handleNotFoundError(error);
        throw notFoundError;
      }

      throw error;
    }
  };

const AnimalsPage = ({ page }) => {
  const params = useLoaderData();
  const navigation = useNavigation();
  const { id } = params;
  const { data } =
    page !== 'shelterAnimals'
      ? useAnimals(page, params)
      : useShelterAnimals(id);

  const isLoading = navigation.state === 'loading';
  console.log({ data });
  return (
    <main className="max-w-screen-xl w-full flex  flex-col justify-center  gap-12 h-full  py-12  mx-auto flex-grow">
      {page !== 'shelterAnimals' ? (
        <TitleSection title={page === 'cats' ? 'Gatetes' : 'Perretes'} />
      ) : (
        <TitleSection title={id} />
      )}

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
  );
};

export default AnimalsPage;
