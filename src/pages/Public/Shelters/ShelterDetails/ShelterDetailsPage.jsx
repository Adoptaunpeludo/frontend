import { Avatar, Button, Image, Link, Spinner } from '@nextui-org/react';
import { IconHome } from '@tabler/icons-react';
import { useState } from 'react';
import { useLoaderData, useOutletContext } from 'react-router-dom';
import {
  AnimalGallery,
  AsideDataColumn,
  ContactShelter,
  H2Title,
  TitleSection,
} from '../../../../components';
import { BUCKET_URL } from '../../../../config/config';
import {
  shelterInformation,
  vetInformation,
} from '../../../../utils/asideDataFields';
import { handleNotFoundError } from '../../../../utils/handleError';

import {
  FacilitiesAsideColumn,
  ShelterRescues,
  SocialMediaAsideColumn,
} from './components/';
import { shelterDetailsQuery, useShelterDetails } from './useShelterDetails';

export const loader =
  (queryClient) =>
  async ({ params }) => {
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
  const { user } = useOutletContext();
  const { username } = params;
  const { data, isLoading } = useShelterDetails(username);
  const imagesGallery = data.images.slice();
  imagesGallery.shift();
  const [images, setImages] = useState(imagesGallery);
  const isOnline = user?.username === username ? true : data.isOnline;
  const isLogged = user !== null;
  if (isLoading) return <Spinner />;

  return (
    <main className="max-w-screen-xl w-full flex  flex-col justify-center  gap-12 h-full  py-12  mx-auto flex-grow">
      <header>
        <TitleSection title={data.username} />
      </header>

      <section className="flex gap-12 max-xl:flex-col mx-auto">
        <section
          id="central-column"
          className="flex flex-col  justify-center flex-1 "
        >
          <div className="relative container lg:w-164 rounded-lg bg-detail bg-cover bg-center">
            <Image
              src={`${BUCKET_URL}/${images[0]}`}
              className=" xl:w-200 xl:max-h-[36rem] object-cover object-center aspect-4/3 flex-1  "
              loading="lazy"
              alt={data.description}
              radius="sm"
              disableSkeleton
            />

            <Avatar
              isBordered
              color={`${
                isLogged ? (isOnline ? 'success' : 'danger') : 'default'
              }`}
              className="absolute right-5 top-5 z-10 bg-white"
              src={`${BUCKET_URL}/${data.images[0]}`}
              showFallback
              fallback={<IconHome className="w-5 h-5 stroke-gray-600" />}
            />
          </div>

          <AnimalGallery animalImages={images} onSetImages={setImages} />

          <p className="p-2">{data.description}</p>
          <ContactShelter className="mx-auto" />
        </section>
        <section
          id="aside-column"
          className="w-96 flex flex-col order-2 max-lg:order-1 mx-auto"
        >
          <H2Title title="información" className={'py-4'} />
          <AsideDataColumn dataColumn={shelterInformation(data)} />

          <H2Title title="instalaciones" className={'py-4'} />
          <AsideDataColumn dataColumn={vetInformation(data)} />
          <FacilitiesAsideColumn facilities={data.facilities} />

          <H2Title title="síguenos en:" className={'py-4'} />
          <SocialMediaAsideColumn socialMedia={data.socialMedia} />
        </section>
      </section>
      <footer className="flex px-4 justify-around items-center flex-col max-sm:justify-start border-primary border-t-1">
        <TitleSection
          title="nuestros peludos"
          className="text-secondary border-hidden"
        />
        <ShelterRescues username={data.username} />
        <Button
          className="font-lobster w-80 py-6 mx-2 text-white text-3xl"
          color="primary"
          href={`/animals/${data.username}`}
          as={Link}
        >
          Ver peludos en adopción
        </Button>
      </footer>
    </main>
  );
};

export default ShelterDetailsPage;
