import { Button, Skeleton, User } from '@nextui-org/react';
import { IconEdit } from '@tabler/icons-react';
import { H2Title, Hero, TitleSection } from '../../../../components';
import { DeleteUserModal, StatusAnimalsTable } from '../../shared';
import { toast } from 'react-toastify';
import { useAnimalImagesContext } from '../../../../context/AnimalImagesContext';
import { useEffect } from 'react';
import { Link } from 'react-router-dom';
import { deleteAnimal } from '../AnimalForm/service';
import ShelterProfileInfo from './components/ShelterProfileInfo';
import UserBioInfo from './components/UserBioInfo';
import { userAnimalsQuery } from '../useUserAnimals';
import { updateProfile } from '../../shared/service/updateUserService';
import { isAxiosError } from 'axios';
import { useUser } from '../../useUser';
import { useUserChats, userChatsQuery } from '../useUserChats';
import { BUCKET_URL } from '../../../../config/config';

export const loader = (queryClient) => async () => {
  try {
    const animals = await queryClient.ensureQueryData(
      userAnimalsQuery('shelter', { limit: 100 })
    );
    const chats = await queryClient.ensureQueryData(userChatsQuery());
    return { chats, animals };
  } catch (error) {
    console.log(error);
    toast.error('Error cargando perfil. ¿Estás logueado?');
    throw error;
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
        if (isAxiosError(error) && error.response.status === 400)
          return toast.error('Error actualizando el perfil del Refugio');
        throw error;
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
        if (isAxiosError(error) && error.response.status === 400)
          return toast.error('Error borrando el anuncio de adopción');
        throw error;
      }
    }
  };

const ShelterProfile = () => {
  const { data, isFetching } = useUser();
  const { data: chats } = useUserChats();

  console.log({ chats });
  const { resetImages } = useAnimalImagesContext();

  useEffect(() => {
    resetImages();
  }, [resetImages]);

  const { username } = data;

  return (
    <main className="bg-default-100 flex-grow">
      <Hero />

      <section
        id="SheltersProfile"
        className="max-w-screen-xl w-full flex  flex-col justify-center  gap-12 h-full  py-12  mx-auto "
      >
        <TitleSection title={username} id=" shelterTitle" />
        <section id="sheltersProfile" className="flex gap-12 max-lg:flex-col ">
          <main className="flex flex-col max-w-3xl order-1 max-lg:order-2">
            <ShelterProfileInfo isLoading={isFetching} data={data} />
          </main>
          <Skeleton isLoaded={!isFetching}>
            <UserBioInfo data={data} isLoading={isFetching} />
          </Skeleton>
        </section>
        <div id="NotificationsAside">
          <H2Title title="Chats" className="pb-5" />
          <div className="flex justify-between border-solid border-b-1 border-b-primary pb-3 items-center">
            {chats.map((chat) => (
              <Link key={chat.slug} to={`/private/chat/${chat.slug}`}>
                <User
                  name={`${chat.animal[0].name.toUpperCase()}/${
                    chat.users[0].username
                  }`}
                  avatarProps={{
                    src: `${BUCKET_URL}/${chat.animal[0].images[0]}`,
                    isBordered: true,
                    color: 'success',
                  }}
                />
              </Link>
            ))}
          </div>
        </div>
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
  );
};

export default ShelterProfile;
