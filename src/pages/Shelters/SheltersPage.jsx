import { Spinner } from '@nextui-org/spinner';
import { useLoaderData } from 'react-router';
import { useNavigation } from 'react-router-dom';
import { Banner, FilterBar, TitleSection } from '../../components';

import { sheltersQuery, useShelters } from './useShelters';

export const loader =
  (queryClient, page) =>
  async ({ request }) => {
    const params = Object.fromEntries([
      ...new URL(request.url).searchParams.entries(),
    ]);

    await queryClient.ensureQueryData(sheltersQuery(page, params));

    return { params };
  };

const SheltersPage = ({ page }) => {
  const { params } = useLoaderData();
  const navigation = useNavigation();

  const { data } = useShelters(page, params);

  console.log({ data });
  const isLoading = navigation.state === 'loading';

  return (
    <>
      <Banner src={`/backgrounds/banner-shelter.jpg`} />
      <main className="max-w-screen-xl w-full flex  flex-col justify-center  gap-12 h-full  py-12  mx-auto">
        <TitleSection title={'asociaciones'} />
        <FilterBar page={page} className="" />
        <ul className="flex justify-center gap-4 flex-wrap p-6">
          {isLoading ? (
            <Spinner className="flex justify-center items-center" />
          ) : (
            // data.map((animal) => <PetCard key={animal.id} animal={animal} />)
            ''
          )}
        </ul>
        <footer className="mx-auto">
          {/* <PagePagination page={page} /> */}
        </footer>
      </main>
    </>
  );
};

export default SheltersPage;
