import { Spinner, Image, Button } from '@nextui-org/react';
import ErrorPage from '../Error/ErrorPage';
import { useAnimalDetails, animalDetailsQuery } from './useAnimalDetails';
import { TitleSection } from '../../components';
import { HeartIcon } from '../../assets/svg';
import { MinimalLogo } from '../../assets/logos';
import { useLoaderData } from 'react-router-dom';
import CatDescription from './components/CatDescription';
import DogDescription from './components/DogDescription';
import ShelterDescription from './components/ShelterDescription';
import BioDescription from './components/BioDescription';
import { BUCKET_URL } from '../../config/config';

const SectionTitle = ({ title }) => <h3 className="my-5 font-bold">{title}</h3>;

export const loader =
  (queryClient) =>
  async ({ params }) => {
    const { slug } = params;
    await queryClient.ensureQueryData(animalDetailsQuery(slug));
    return params;
  };

const AnimalDetailsPage = () => {
  const params = useLoaderData();

  const { slug } = params;

  const { data, isLoading, isError } = useAnimalDetails(slug);

  if (isError) return <ErrorPage />;
  if (isLoading) return <Spinner />;

  console.log({ data });

  return (
    <>
      <TitleSection title={data.name} />

      <main className="flex flex-row justify-center">
        <section className=" w-[1000px] p-3">
          <div className="relative ">
            <Image src={`${BUCKET_URL}/${data.images[0]}`}></Image>
            <HeartIcon size={40} className="absolute left-3 bottom-3 z-10" />
            <MinimalLogo size={60} className="absolute right-3 top-3 z-10" />
            <Button className="absolute right-3 bottom-3 z-10" color="primary">
              Adoptar
            </Button>
          </div>
          <p className="p-2">{data.description}</p>
          {/*<p className="p-2">{data.description} </p>*/}
        </section>

        {/* Info */}
        <section className="p-3">
          <SectionTitle title="Información" />
          <ShelterDescription data={data} />

          <SectionTitle title="BIO" />
          <BioDescription data={data} />

          <SectionTitle title="Otras características" />
          {data.type === 'cat' && <CatDescription data={data} />}
          {data.type === 'dog' && <DogDescription data={data} />}
        </section>
      </main>
    </>
  );
};

export default AnimalDetailsPage;
