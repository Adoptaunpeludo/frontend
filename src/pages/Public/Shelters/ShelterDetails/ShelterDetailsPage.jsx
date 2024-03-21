import { Image, Spinner } from '@nextui-org/react';
import { IconHeart } from '@tabler/icons-react';
import { useLoaderData } from 'react-router-dom';
import { MinimalLogo } from '../../../../assets/logos';
import {
  AdoptButton,
  ContactShelter,
  H2Title,
  TitleSection,
} from '../../../../components';
import { BUCKET_URL } from '../../../../config/config';
import { handleNotFoundError } from '../../../../utils/handleError';
import { shelterDetailsQuery, useShelterDetails } from './useShelterDetails';

export const loader =
  (queryClient) =>
  async ({ params }) => {
    console.log({ params });
    try {
      const { username } = params;
      await queryClient.ensureQueryData(shelterDetailsQuery(username));
      return params;
    } catch (error) {
      if (error.response.status === 404) {
        const notFoundError = handleNotFoundError(error);
        throw notFoundError;
      }

      throw error;
    }
  };

const ShelterDetailsPage = () => {
  const params = useLoaderData();

  const { username } = params;

  const { data, isLoading } = useShelterDetails(username);

  if (isLoading) return <Spinner />;

  console.log(data);
  return (
    <main className="max-w-screen-xl w-full flex  flex-col justify-center  gap-12 h-full  py-12  mx-auto flex-grow">
      <header>
        <TitleSection title={data.username} />
      </header>

      <section className="flex gap-12 max-xl:flex-col mx-auto">
        <section id="central-column" className="flex flex-col flex-1">
          {/* TODO: check loading image put spinner reservate space */}
          <div className="relative container lg:w-164">
            <Image
              src={`${BUCKET_URL}/${data.images[0]}`}
              className=" xl:w-200 xl:max-h-[36rem] object-cover object-top aspect-4/3 flex-1"
              loading="lazy"
              alt={data.description}
              radius="sm"
            />
            <IconHeart
              size={40}
              className="absolute left-3 bottom-3 z-10  stroke-primary"
            />
            {/* {TODO: change Minimal logo shelter avatar} */}
            <MinimalLogo size={60} className="absolute right-5 top-5 z-10" />
            <AdoptButton className="absolute right-5 bottom-5 z-10">
              Adoptar
            </AdoptButton>
          </div>

          {/* <ImageGallery animalImages={data.images} /> */}

          <p className="p-2">{data.description}</p>
        </section>
        <section
          id="aside-column"
          className="w-96 flex flex-col order-2 max-lg:order-1 mx-auto"
        >
          <H2Title title="información" className={'py-4'} />
          {/* <AsideDataColumn dataColumn={animalShelterInfo(data)} /> */}

          <H2Title title="bio" className={'py-4'} />
          {/* <AsideDataColumn dataColumn={animalBioInfo(data)} /> */}

          <H2Title title="Otras características" className={'py-4'} />

          {/* {data.type === 'cat' && (
            <AsideDataColumn dataColumn={catDescription(data)} />
          )}
          {data.type === 'dog' && (
            <AsideDataColumn dataColumn={dogDescription(data)} />
          )} */}
        </section>
      </section>
      <footer className="flex px-4 justify-around items-center max-sm:flex-col max-sm:justify-start">
        <ContactShelter />
      </footer>
    </main>
  );
};

export default ShelterDetailsPage;
