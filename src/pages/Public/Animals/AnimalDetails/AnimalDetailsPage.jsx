import { Avatar, Image, Spinner } from '@nextui-org/react';
import { IconHeart, IconHome } from '@tabler/icons-react';
import { useEffect, useState } from 'react';
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

  const { data, isLoading } = useAnimalDetails(slug);
  const [images, setImages] = useState(data.images);
  const isLogged = user !== null;
  if (isLoading) return <Spinner />;
  const isOnline = user?.username === data.user.username ? true : data.isOnline;

  useEffect(() => {
    // Title of page
    document.title = `Adopta un peludo - ${slug}`;

    // add meta tag og:Title
    const metaOgTitle = document.createElement('meta');
    metaOgTitle.setAttribute('property', 'og:title');
    metaOgTitle.content = `Adopta un peludo - ${slug}`;
    document.getElementsByTagName('head')[0].appendChild(metaOgTitle);

    // add meta tag 'og:description'
    const metaOgDescription = document.createElement('meta');
    metaOgDescription.setAttribute('property', 'og:description');
    metaOgDescription.content = `Conoce a nuestro peludo, ${data.name} y ayúdanos a encontrarle un hogar`;
    document.getElementsByTagName('head')[0].appendChild(metaOgDescription);

    // add meta tag 'og:image'
    const metaOgImage = document.createElement('meta');
    metaOgImage.setAttribute('property', 'og:image');
    metaOgImage.content = `${
      images[0] !== undefined ? `${BUCKET_URL}/${images[0]}` : ''
    }`;
    document.getElementsByTagName('head')[0].appendChild(metaOgImage);

    // add meta tag 'og:url'
    const metaOgUrl = document.createElement('meta');
    metaOgUrl.setAttribute('property', 'og:url');
    metaOgUrl.content = `https://www.adoptaunpeludo.com/animals/${data.type}s/${slug}`;
    document.getElementsByTagName('head')[0].appendChild(metaOgUrl);

    // add meta tag 'og:type'
    const metaOgType = document.createElement('meta');
    metaOgType.setAttribute('property', 'og:type');
    metaOgType.content = 'article';
    document.getElementsByTagName('head')[0].appendChild(metaOgType);

    // Clean at unmount the component
    return () => {
      document.getElementsByTagName('head')[0].removeChild(metaOgTitle);
      document.getElementsByTagName('head')[0].removeChild(metaOgDescription);
      document.getElementsByTagName('head')[0].removeChild(metaOgImage);
      document.getElementsByTagName('head')[0].removeChild(metaOgUrl);
      document.getElementsByTagName('head')[0].removeChild(metaOgType);
    };
  }, []);

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
        <ShareSocialMedia />
      </footer>
    </main>
  );
};

export default AnimalDetailsPage;
