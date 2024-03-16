import { Button, Image, Spinner } from '@nextui-org/react';
import { useLoaderData } from 'react-router-dom';
import { MinimalLogo } from '../../assets/logos';
import { HeartIcon } from '../../assets/svg';
import { AsideDataColumn, H2Title, TitleSection } from '../../components';
import { BUCKET_URL_ANIMALS } from '../../config/config';
import {
  animalBioInfo,
  animalShelterInfo,
  catDescription,
  dogDescription
} from '../../utils/asideDataFields';
import ErrorPage from '../Error/ErrorPage';
import { animalDetailsQuery, useAnimalDetails } from './useAnimalDetails';

const SectionTitle = ({ title }) => <h3 className='my-5 font-bold'>{title}</h3>;

export const loader =
  queryClient =>
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

      <main className='flex flex-row justify-center'>
        <section className=' w-[1000px] p-3'>
          <div className='relative '>
            <Image src={`${BUCKET_URL_ANIMALS}/${data.images[0]}`}></Image>
            <HeartIcon size={40} className='absolute left-3 bottom-3 z-10' />
            <MinimalLogo size={60} className='absolute right-3 top-3 z-10' />
            <Button className='absolute right-3 bottom-3 z-10' color='primary'>
              Adoptar
            </Button>
          </div>
          <p className='p-2'>{data.description}</p>
          {/*<p className="p-2">{data.description} </p>*/}
        </section>

        {/* Info */}
        <section className='p-3'>
          <H2Title title='información' className={'py-4'} />
          <AsideDataColumn dataColumn={animalShelterInfo(data)} />

          <H2Title title='bio' className={'py-4'} />
          <AsideDataColumn dataColumn={animalBioInfo(data)} />

          <H2Title title='Otras características' className={'py-4'} />

          {data.type === 'cat' && (
            <AsideDataColumn dataColumn={catDescription(data)} />
          )}
          {data.type === 'dog' && (
            <AsideDataColumn dataColumn={dogDescription(data)} />
          )}
        </section>
      </main>
    </>
  );
};

export default AnimalDetailsPage;
