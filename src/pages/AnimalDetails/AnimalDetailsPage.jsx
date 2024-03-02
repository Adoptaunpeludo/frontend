import { Spinner } from "@nextui-org/react";
import ErrorPage from "../Error/ErrorPage";
import { useAnimalDetails, animalDetailsQuery  } from "./useAnimalDetails";


export const loader = (queryClient) => async () => {
  await queryClient.ensureQueryData(animalDetailsQuery());
  return null;
};

const AnimalDetailsPage = () => {
  const { data, isLoading, isError } = useAnimalDetails();

  if (isError) return <ErrorPage />;
  if (isLoading) return <Spinner />;

  const { currentPage, limit, maxPages, next, prev, total, animals } = data;
  console.log({ data });
  


    return (
    <>


      <div className="max-w-sm rounded overflow-hidden shadow-lg bg-white">
        {/*<img className="w-full" alt={data.name} />*/}
        <div className="px-6 py-4">
          <div className="font-bold text-xl mb-2">{data.name}</div>
          <p className="text-gray-700 text-base">
            {data.description}
          </p>
        </div>
        {/*<div className="px-6 pt-4 pb-2">
          {tags.map((tag, index) => (
            <span key={index} className="inline-block bg-gray-200 rounded-full px-3 py-1 text-sm font-semibold text-gray-700 mr-2 mb-2">
              #{tag}
            </span>
          ))}
        </div>*/}
        <div className="px-6 pt-4 pb-2">
          <button className="bg-green-500 hover:bg-green-700 text-white font-bold py-2 px-4 rounded">
            Adoptar
          </button>
        </div>
      </div>
    </>
  );
};


export default AnimalDetailsPage;