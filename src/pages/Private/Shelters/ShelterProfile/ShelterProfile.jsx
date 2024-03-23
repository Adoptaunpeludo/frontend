import { Button, Skeleton } from '@nextui-org/react';
import { IconEdit } from '@tabler/icons-react';
import { Hero, TitleSection } from '../../../../components';
import { DeleteUserModal, StatusAnimalsTable } from '../../shared';
import { toast } from 'react-toastify';

import { useUser } from '../../useUser';
import { useAnimalImagesContext } from '../../../../context/AnimalImagesContext';
import { useEffect } from 'react';
import { Link } from 'react-router-dom';
import { deleteAnimal } from '../AnimalForm/service';
import ShelterProfileInfo from './components/ShelterProfileInfo';
import UserBioInfo from './components/UserBioInfo';
import { userAnimalsQuery } from '../useUserAnimals';
import { updateProfile } from '../../shared/service/updateUserService';

export const loader = (queryClient) => async () => {
  try {
    const data = await queryClient.ensureQueryData(
      userAnimalsQuery('shelter', { limit: 100 })
    );
    return data;
  } catch (error) {
    console.log(error);
    return error;
  }
};

export const action =
  (closeBioModal, closeShelterModal, queryClient) =>
  async ({ request }) => {
    let formData = await request.formData();
    let intent = formData.get('intent');

    if (intent === 'shelter-profile' || intent === 'user-profile') {
      try {
        await updateProfile(formData, intent);
        queryClient.invalidateQueries({ queryKey: ['user'] });
        toast.success('Perfil del Refugio actualizado');
        closeBioModal();
        closeShelterModal();
        return null;
      } catch (error) {
        console.log(error);
        toast.error('Error actualizando perfil del Refugio');
        return null;
      }
    }

    if (intent === 'delete-animal') {
      try {
        await deleteAnimal(formData);
        await queryClient.invalidateQueries((queryKey) =>
          queryKey.includes('animals')
        );
        toast.success(`Anuncio de adopción borrado`);
        return null;
      } catch (error) {
        console.log(error);
        toast.error('Error borrando el anuncio de adopción');
        return null;
      }
    }
  };

const ShelterProfile = () => {
  const { data, isFetching } = useUser();

  const { resetImages } = useAnimalImagesContext();

  useEffect(() => {
    resetImages();
  }, [resetImages]);

  const { username } = data;

  return (
    <Skeleton className="bg-default-100 flex-grow" isLoaded={!isFetching}>
      <main className="bg-default-100 flex-grow">
        <Hero />

        <section
          id="SheltersProfile"
          className="max-w-screen-xl w-full flex  flex-col justify-center  gap-12 h-full  py-12  mx-auto "
        >
          <TitleSection title={username} id=" shelterTitle" />
          <section
            id="sheltersProfile"
            className="flex gap-12 max-lg:flex-col "
          >
            <main className="flex flex-col max-w-3xl order-1 max-lg:order-2">
              <ShelterProfileInfo isLoading={isFetching} data={data} />
            </main>
            <UserBioInfo data={data} isLoading={isFetching} />
            {/* <div id="NotificationsAside">
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
          </div> */}
          </section>
          <section id="petsTable" className="px-4">
            <StatusAnimalsTable role={'shelter'} />
            <Button
              // isIconOnly={data !== undefined}
              color="primary"
              size="md"
              startContent={<IconEdit />}
              className="my-4"
              as={Link}
              to="/private/shelter/create-animal"
            >
              Crear Anuncio
            </Button>
          </section>
          <footer className="border-solid border-t-1 border-t-danger py-8 h-100 flex justify-center">
            <DeleteUserModal />
          </footer>
        </section>
      </main>
    </Skeleton>
  );
};

export default ShelterProfile;
