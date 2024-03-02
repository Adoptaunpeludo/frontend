import { Spinner, Divider } from "@nextui-org/react";
import ErrorPage from "../Error/ErrorPage";
import { catsQuery, useDogs } from "./useDogs";
import { PetCard, TitleSection } from "@shared";

export const loader = (queryClient) => async () => {
  await queryClient.ensureQueryData(catsQuery());
  return null;
};

const DogsPage = () => {
  const { data, isLoading, isError } = useDogs();

  if (isError) return <ErrorPage />;
  if (isLoading) return <Spinner />;

  const { currentPage, limit, maxPages, next, prev, total, animals } = data;

  console.log({ animals });

  if (animals.lengto === 0) return;

  return (
    <>
      <TitleSection title="Perretes"/>

      <ul className="flex justify-center gap-4 flex-wrap p-6 ">
        {animals.map((animal) => (
          <PetCard key={animal.id} animal={animal} />
        ))}
      </ul>
    </>
  );
};

export default DogsPage;
