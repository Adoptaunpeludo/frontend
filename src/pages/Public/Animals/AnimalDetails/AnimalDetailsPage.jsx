import { Avatar, Image } from '@nextui-org/react';
import { IconHeart, IconHome } from '@tabler/icons-react';
import { useState } from 'react';
import { useLoaderData, useOutletContext } from 'react-router-dom';
import {
  AdoptButton,
  AsideDataColumn,
  ContactShelter,
  H2Title,
  TitleSection,
} from '../../../../components';
import { BUCKET_URL } from '../../../../config/config';
import {
  animalBioInfo,
  animalShelterInfo,
  catDescription,
  dogDescription,
} from '../../../../utils/asideDataFields';
import { handleNotFoundError } from '../../../../utils/handleError';
import { animalDetailsQuery, useAnimalDetails } from '../useAnimalDetails';
import { AnimalFavs, AnimalGallery, ShareSocialMedia } from './components';
import { useMetadata } from '../../../../hooks/useMetadata';

export const loader =
  (queryClient) =>
  async ({ params }) => {
    try {
      const { slug } = params;
      await queryClient.ensureQueryData(animalDetailsQuery(slug));
      return params;
    } catch (error) {
      if (error.response.status === 404) {
        const notFoundError = handleNotFoundError(error);
        throw notFoundError;
      }

      throw error;
    }
  };

const AnimalDetailsPage = () => {
  const params = useLoaderData();
  const { user } = useOutletContext();
  const { slug } = params;

  const { data } = useAnimalDetails(slug);
  const [images, setImages] = useState(data.images);
  const isLogged = user !== null;

  const isOnline =
    user?.username === data.user.username ? true : data.user.isOnline;

  console.log({ data });

  useMetadata(data, slug, images);

  return (
    <main className="max-w-screen-xl w-full flex  flex-col justify-center  gap-12 h-full  py-12  mx-auto flex-grow">
      <header>
        <TitleSection title={data.name} />
      </header>

      <section className="flex gap-12 max-xl:flex-col mx-auto">
        <section id="central-column" className="flex flex-col flex-1">
          <div className="relative container lg:w-164 rounded-lg bg-detail bg-cover bg-center">
            <Image
              src={`${BUCKET_URL}/${images[0]}`}
              className=" xl:w-200 xl:max-h-[36rem] object-cover object-center aspect-4/3 flex-1"
              loading="lazy"
              alt={slug}
              radius="sm"
              disableSkeleton
            />
            <IconHeart
              size={40}
              className="absolute left-3 bottom-3 z-10  stroke-primary"
            />

            <Avatar
              isBordered
              color={`${
                isLogged ? (isOnline ? 'success' : 'danger') : 'default'
              }`}
              className="absolute right-5 top-5 z-10 bg-white"
              src={`${BUCKET_URL}/${data.user.Avatar}`}
              showFallback
              fallback={<IconHome className="w-10 h-10 stroke-gray-600" />}
            />
            <AdoptButton
              className="absolute right-5 bottom-5 z-10"
              adoptAnimal={`/shelters/${data.user.username}`}
            >
              Adoptar
            </AdoptButton>
          </div>

          <AnimalGallery animalImages={images} onSetImages={setImages} />

          <p className="p-2">{data.description}</p>
        </section>
        <section
          id="aside-column"
          className="w-96 flex flex-col order-2 max-lg:order-1 mx-auto"
        >
          <H2Title title="información" className={'py-4'} />
          <AsideDataColumn dataColumn={animalShelterInfo(data)} />

          <H2Title title="bio" className={'py-4'} />
          <AsideDataColumn dataColumn={animalBioInfo(data)} />

          <H2Title title="Otras características" className={'py-4'} />

          {data.type === 'cat' && (
            <AsideDataColumn dataColumn={catDescription(data)} />
          )}
          {data.type === 'dog' && (
            <AsideDataColumn dataColumn={dogDescription(data)} />
          )}
        </section>
      </section>
      <footer className="flex px-4 justify-around items-center max-sm:flex-col max-sm:justify-start">
        <AnimalFavs numFavs={data.numFavs} />
        <ContactShelter />
        <ShareSocialMedia
          url={`https://www.adoptaunpeludo.com/animals/${data.type}s/${slug}`}
        />
      </footer>
    </main>
  );
};

export default AnimalDetailsPage;
