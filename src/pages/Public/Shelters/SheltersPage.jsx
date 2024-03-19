import { Spinner } from '@nextui-org/spinner';
import { useLoaderData } from 'react-router';
import { useNavigation } from 'react-router-dom';

import { useEffect, useRef } from 'react';
import {
  Banner,
  FilterBar,
  ShelterCard,
  TitleSection,
} from '../../../components';
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
  const titleRef = useRef(null);
  const { data, isLoading } = useShelters(page, params);
  //const isLoading = navigation.state === 'loading';
  useEffect(() => {
    if (!isLoading) {
      // titleRef.current.scrollIntoView({ behavior: 'instant' });
    }
  }, [isLoading]);

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
            data.users.map((shelter) => (
              <ShelterCard key={shelter.id} shelter={shelter} />
              //<p>{JSON.stringify(data, null, 2)}</p>
            ))
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
