import { useLoaderData } from 'react-router';
import { useNavigation, useOutletContext } from 'react-router-dom';

import { Skeleton } from '@nextui-org/react';
import {
  FilterBar,
  NoData,
  PagePagination,
  TitleSection,
} from '../../../components';
import { animalsQuery, useAnimals } from '../Landing/useAnimals';
import { PetCard } from './components/PetCard';

export const loader =
  (queryClient, page) =>
  async ({ request, params }) => {
    const filters = Object.fromEntries([
      ...new URL(request.url).searchParams.entries(),
    ]);
    if (filters.name) filters.name = filters.name.toLowerCase();
    try {
      await queryClient.ensureQueryData(animalsQuery(page, filters, params));
      return { filters, params };
    } catch (error) {
      console.log(error);
      throw error;
    }
  };

const AnimalsPage = ({ page }) => {
  const { user } = useOutletContext();
  const { params, filters } = useLoaderData();
  const navigation = useNavigation();

  const { shelterName } = params;

  const { data: animals } = useAnimals(page, filters, params);

  const isLoading = navigation.state === 'loading';
  const isLogged = user !== null;

  return (
    <>
      <main className="max-w-screen-xl w-full flex  flex-col justify-center  gap-12 h-full  py-12  mx-auto flex-grow">
        <header className="flex flex-col align-top">
          {page !== 'shelters' ? (
            <TitleSection title={page === 'cats' ? 'Gatetes' : 'Perretes'} />
          ) : (
            <TitleSection title={shelterName} />
          )}

          <FilterBar page={page} />
        </header>
        <section className="flex flex-col flex-auto">
          <ul className="flex justify-center gap-4 flex-wrap p-6">
            {animals?.animals.length > 0 ? (
              animals?.animals.map((animal) => (
                <Skeleton isLoaded={!isLoading} key={animal.id}>
                  <PetCard
                    key={animal.id}
                    animal={animal}
                    isLogged={isLogged}
                  />
                </Skeleton>
              ))
            ) : (
              <NoData />
            )}
          </ul>
        </section>

        <footer className="mx-auto">
          <PagePagination data={animals} />
        </footer>
      </main>
    </>
  );
};

export default AnimalsPage;
