import { Spinner, Pagination } from "@nextui-org/react";
import ErrorPage from "../Error/ErrorPage";
import { catsQuery, useCats } from "./useCats";
import { FilterBar, PetCard, TitleSection } from "../shared";

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
      <TitleSection title="Gatetes" />

      <FilterBar></FilterBar>

      <ul className="flex justify-center gap-4 flex-wrap p-6 ">
        {animals.map((animal) => (
          <PetCard key={animal.id} animal={animal} />
        ))}
      </ul>
      <div className=" flex justify-center my-8">
        {/* //! TODO: Connect to Query */}
        <Pagination total={10} initialPage={1} />
      </div>
    </>
  );
};

export default CatsPage;
