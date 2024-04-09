import { Button, Skeleton } from '@nextui-org/react';
import { IconEdit } from '@tabler/icons-react';
import { isAxiosError } from 'axios';
import { useEffect } from 'react';
import { Link } from 'react-router-dom';
import { toast } from 'react-toastify';
import { H2Title, TitleSection } from '../../../../components';
import { useAnimalImagesContext } from '../../../../context/AnimalImagesContext';
import { buttonStyleConfig } from '../../../../utils/configFormFields';
import { DeleteUserModal, StatusAnimalsTable } from '../../shared';
import { UserChangePassword } from '../../shared/components/UserChangePassword';
import { updatePassword } from '../../shared/service/ChangePasswordService';
import { updateProfile } from '../../shared/service/updateUserService';
import { useUser } from '../../useUser';
import { deleteAnimal } from '../AnimalForm/service';
import { userAnimalsQuery } from '../useUserAnimals';
import { userChatsQuery } from '../useUserChats';
import ShelterProfileInfo from './components/ShelterProfileInfo';
import UserBioInfo from './components/UserBioInfo';

export const loader =
  (queryClient) =>
  async ({ params }) => {
    try {
      const animals = await queryClient.ensureQueryData(
        userAnimalsQuery('shelter', { limit: 100 })
      );
      const chats = await queryClient.ensureQueryData(
        userChatsQuery(params.username)
      );
      return { chats, animals };
    } catch (error) {
      console.log(error);
      toast.error('Error cargando perfil. ¿Estás logueado?');
      throw error;
    }
  };

export const action =
  (closeBioModal, closeShelterModal, closeUpdatePasswordModal, queryClient) =>
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

    if (intent === 'change-password') {
      try {
        await updatePassword(formData);
        toast.success(`Password cambiada con éxito`);
        closeUpdatePasswordModal();
        return null;
      } catch (error) {
        if (isAxiosError(error) && error.response.status === 400)
          return toast.error('Error cambiando password');
        throw error;
      }
    }
  };

const ShelterProfile = () => {
  //const params = useParams();
  const { data: user, isFetching: isFetchingUser } = useUser();

  const { resetImages } = useAnimalImagesContext();
  //const navigate = useNavigate();

  useEffect(() => {
    resetImages();
  }, [resetImages]);

  return (
    <main className="bg-default-100 flex-grow">
      <section
        id="SheltersProfile"
        className="max-w-screen-xl w-full flex  flex-col justify-center  h-full  py-12  mx-auto gap-5"
      >
        <TitleSection title={user?.username} id=" shelterTitle" />
        <section id="sheltersProfile" className="flex gap-12 max-lg:flex-col ">
          <main className="flex flex-col max-w-3xl order-1 ">
            <ShelterProfileInfo isLoading={isFetchingUser} data={user} />
          </main>
          <aside className="order-2">
            <Skeleton isLoaded={!isFetchingUser}>
              <UserBioInfo data={user} isLoading={isFetchingUser} />
            </Skeleton>
            <H2Title title="Seguridad" className="" />
            <UserChangePassword isDisabled={user.accountType === 'google'} />
          </aside>
        </section>

        <section id="petsTable">
          <StatusAnimalsTable role={'shelter'} />
          <Button
            // isIconOnly={data !== undefined}
            color="primary"
            size="md"
            startContent={<IconEdit />}
            as={Link}
            to="/private/shelter/create-animal"
            className={buttonStyleConfig}
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
