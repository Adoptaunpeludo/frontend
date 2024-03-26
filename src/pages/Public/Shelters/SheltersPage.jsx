import { Skeleton } from '@nextui-org/react';
import { useLoaderData } from 'react-router';
import { useNavigation, useOutletContext } from 'react-router-dom';
import { FilterBar, PagePagination, TitleSection } from '../../../components';
import { ShelterCard } from './components';
import { sheltersQuery, useShelters } from './useShelters';

export const loader =
  (queryClient) =>
  async ({ request }) => {
    const params = Object.fromEntries([
      ...new URL(request.url).searchParams.entries(),
    ]);
    try {
      await queryClient.ensureQueryData(sheltersQuery(params));
      return { params };
    } catch (error) {
      console.log(error);
      throw error;
    }
  };

const SheltersPage = ({ page }) => {
  const { params } = useLoaderData();
  const { user } = useOutletContext();
  const { data } = useShelters(params);

  const navigation = useNavigation();
  const isLoading = navigation.state === 'loading';
  const isLogged = user !== null;

  return (
    <main className="max-w-screen-xl w-full flex  flex-col justify-center  gap-12 h-full  py-12  mx-auto flex-grow">
      <header className="flex flex-col align-top">
        <TitleSection title={'asociaciones'} />
        <FilterBar page={page} className="" />
      </header>
      <section className="flex flex-col flex-auto">
        <ul className="flex justify-center gap-4 flex-wrap p-6">
          {data?.users.map((shelter) => (
            <Skeleton isLoaded={!isLoading} key={shelter.id}>
              <ShelterCard
                key={shelter.id}
                shelter={shelter}
                isLogged={isLogged}
              />
            </Skeleton>
          ))}
        </ul>
      </section>

      <footer className="mx-auto">
        <PagePagination data={data} />
      </footer>
    </main>
  );
};

export default SheltersPage;
