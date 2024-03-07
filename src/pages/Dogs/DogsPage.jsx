import { Spinner, Pagination } from "@nextui-org/react";
import ErrorPage from "../Error/ErrorPage";
import { catsQuery, useDogs } from "./useDogs";
import { PetCard, TitleSection, Banner } from "../../components/shared";

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
      <Banner src={"/backgrounds/banner-dogs.jpg"} />
      <TitleSection title="Perretes" />

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

export default DogsPage;
