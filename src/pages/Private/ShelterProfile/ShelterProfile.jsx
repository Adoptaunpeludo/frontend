import { Avatar, Button, Spinner, User } from '@nextui-org/react';
import {
  IconBrandFacebook,
  IconBrandInstagram,
  IconBrandX,
  IconTrashXFilled,
} from '@tabler/icons-react';

import {
  Hero,
  TitleSection,
  H2Title,
  H3Title,
  AsideDataColumn,
  CameraIcon,
} from '../../../components';

import { ImagesFrame } from '../shared/ImagesFrame';
import { StatusAnimalsTable } from '../shared/StatusAnimalsTable';
import { userInformation } from '../shared/mapUserInformation';
import Accommodations from './components/Acommodations';
import { useUser } from '../../Layout/useUser';
import { BUCKET_URL } from '../../../config/config';
import ShelterForm from '../ShelterForm/ShelterForm';
import SocialMediaForm from '../ShelterForm/components/SocialMediaForm';
import { toast } from 'react-toastify';
import { useNavigate, useNavigation } from 'react-router-dom';
import { useEffect } from 'react';
import {
  createPetAdoption,
  updateShelterProfile,
} from '../ShelterForm/service';
import UserFormBio from '../UserFormBio/UserFormBio';
import AnimalForm from '../AnimalForm/AnimalForm';

export const action =
  (queryClient) =>
  async ({ request }) => {
    let formData = await request.formData();
    let intent = formData.get('intent');

    if (intent === 'shelter-profile' || intent === 'shelter-user-profile') {
      try {
        await updateShelterProfile(formData, intent);
        queryClient.invalidateQueries({ queryKey: ['user'] });
        toast.success('Perfil del Refugio actualizado');
        return null;
      } catch (error) {
        console.log(error);
        toast.error('Error actualizando perfil del Refugio');
        return null;
      }
    }

    if (intent === 'create-adoption') {
      try {
        await createPetAdoption(formData);
        queryClient.invalidateQueries({
          queryKey: ['user-animals'],
        });
        return null;
      } catch (error) {
        console.log(error);
        toast.error('Error creando anuncio de adopcion');
        return null;
      }
    }
  };

const ShelterProfile = () => {
  const { data, isFetching } = useUser();
  const navigate = useNavigate();
  const navigation = useNavigation();

  const isSubmitting = navigation.state === 'submitting';

  useEffect(() => {
    if (!isFetching && !data) {
      toast.warn('Por favor primero haz login con tu cuenta');
      return navigate('/login');
    }
  }, [navigate, data, isFetching]);

  const {
    cif,
    legalForms,
    veterinaryFacilities,
    username,
    avatar,
    ownVet,
    description,
    images,
    socialMedia,
    facilities,
  } = data;
  const userData = userInformation(data);

  return (
    <main className="bg-default-100">
      <Hero />
      <section
        id="SheltersProfile"
        className="max-w-screen-xl w-full flex  flex-col justify-center  gap-12 h-full  py-12  mx-auto "
      >
        <TitleSection title={username} id=" shelterTitle" />
        <section id="sheltersProfile" className="flex gap-12 max-lg:flex-col ">
          <main className="flex flex-col max-w-3xl order-1 max-lg:order-2">
            <div
              id="Profile"
              className="flex flex-col gap-4 border-solid border-b-1 border-b-primary"
            >
              <H2Title title="Protectora" />
              <div id="legalFrame" className="flex gap-5 mx-3">
                <span id="cif">CIF: {cif}</span>
                <span id="legalForm">Forma legal: {legalForms}</span>
              </div>
              <div id="facilities" className="flex flex-col gap-2 mx-3">
                <H3Title title="Instalaciones" />
                <div id="veterinarianFacilities" className="flex gap-5 mx-3">
                  <span>
                    Instalaciones veterinarias:{' '}
                    {veterinaryFacilities ? 'si' : 'no'}
                  </span>
                  <span>Veterinario propio: {ownVet ? 'si' : 'no'}</span>
                </div>
              </div>

              {isFetching ? (
                <Spinner />
              ) : (
                <Accommodations facilities={facilities} />
              )}

              <div id="description" className="flex flex-col gap-3 mx-3 py-3">
                <H3Title title="Descripción:" />
                <div>{description}</div>
              </div>
              <ShelterForm isSubmitting={isSubmitting} data={data} />
              <ImagesFrame images={images} />
              <div id="socialMedia" className="flex flex-col gap-3 mx-3 py-3 ">
                <H3Title title="Redes sociales:" />
                <div className="flex gap-4 justify-between max-sm:flex-col max-sm:mx-auto">
                  {socialMedia.map((media) => (
                    <div className="flex items-center gap-2" key={media.name}>
                      {media.name === 'facebook' && <IconBrandFacebook />}
                      {media.name === 'xtweet' && <IconBrandX />}
                      {media.name === 'instagram' && <IconBrandInstagram />}
                      {media.url === '' ? <span>Vacio</span> : media.url}
                    </div>
                  ))}
                </div>
              </div>
            </div>
            <SocialMediaForm socialMedia={socialMedia} />
          </main>
          <aside className="w-96 flex flex-col order-2 max-lg:order-1 mx-auto">
            <div id="profileAside" className=" flex flex-col gap-5">
              <Avatar
                isBordered
                color="success"
                className="w-40 h-40 bg-white self-center"
                src={`${BUCKET_URL}/${avatar}`}
                showFallback
                fallback={<CameraIcon />}
              />
              <div
                id="personalData"
                className="flex flex-col justify-start gap-4"
              >
                <H2Title title="Información" />
                <AsideDataColumn dataColumn={userData} />
              </div>
            </div>
            <UserFormBio data={data} isSubmitting={isSubmitting} />
            <div id="NotificationsAside">
              <H2Title title="Mensajes" className="pb-5" />
              <div className="flex justify-between border-solid border-b-1 border-b-primary pb-3 items-center">
                <User
                  name="Jane Doe"
                  avatarProps={{
                    src: 'https://i.pravatar.cc/150?u=a04258114e29026702d',
                    isBordered: true,
                    color: 'success',
                  }}
                />
                {1}
              </div>
            </div>
          </aside>
        </section>
        <section id="petsTable" className="px-4">
          <StatusAnimalsTable role={'shelter'} />
          <AnimalForm isSubmitting={isSubmitting} />
        </section>
        <footer className="border-solid border-t-1 border-t-danger py-8 h-100 flex justify-center">
          <Button color="danger" size="lg" startContent={<IconTrashXFilled />}>
            Borrar Usuario
          </Button>
        </footer>
      </section>
    </main>
  );
};

export default ShelterProfile;
