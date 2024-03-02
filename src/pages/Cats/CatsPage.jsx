import { Spinner } from '@nextui-org/react';
import ErrorPage from '../Error/ErrorPage';
import { catsQuery, useCats } from './useCats';
import { PetCard } from '@shared/PetCard';

export const loader = (queryClient) => async () => {
  await queryClient.ensureQueryData(catsQuery());
  return null;
};

const CatsPage = () => {
  const { data, isLoading, isError } = useCats();

  if (isError) return <ErrorPage />;
  if (isLoading) return <Spinner />;

  const { currentPage, limit, maxPages, next, prev, total, animals } = data;

  console.log({ animals });

  if (animals.lengto === 0) return;

  return (
    <>
      <div>Animals Page</div>
      <ul className="flex gap-4 flex-wrap p-6 ">
          {animals.map((animal) => <PetCard key={animal.id} animal={animal} />)}
      </ul>
    </>
  );
};

export default CatsPage;