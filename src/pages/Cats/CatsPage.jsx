import { Card, CardBody, CardHeader, Spinner } from '@nextui-org/react';
import ErrorPage from '../Error/ErrorPage';
import { catsQuery, useCats } from './useCats';

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
        {animals.map((animal) => (
          <Card key={animal.slug} className="p-4">
            <CardHeader className="pb-0 pt-2 px-4 flex-col items-start">
              <p key={animal.id}>ID: {animal.id}</p>
              <p key={animal.slug}>Slug: {animal.slug}</p>
            </CardHeader>
            <CardBody overflow-visible py-2>
              <p key={animal.name}>Name: {animal.name}</p>
              <p key={animal.age}>Age: {animal.age}</p>
              <p key={animal.gender}>Gender: {animal.gender}</p>
            </CardBody>
          </Card>
        ))}
      </ul>
    </>
  );
};

export default CatsPage;
