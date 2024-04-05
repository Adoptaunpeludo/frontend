import { H2Title, TitleSection } from '../../../../components';
import { DeleteUserModal, ImagesFrame, StatusAnimalsTable } from '../../shared';
import { userAnimalsQuery } from '../../Shelters/useUserAnimals';

import { Skeleton } from '@nextui-org/skeleton';
import { isAxiosError } from 'axios';
import { Form, useNavigate, useParams } from 'react-router-dom';
import { toast } from 'react-toastify';
import { useWebSocketContext } from '../../../../context/WebSocketContext';
import { deleteFav } from '../../../Public/Animals/service';
import { UserChangePassword } from '../../shared/components/UserChangePassword';
import { updatePassword } from '../../shared/service/ChangePasswordService';
import { updateProfile } from '../../shared/service/updateUserService';
import UserBioInfo from '../../Shelters/ShelterProfile/components/UserBioInfo';
import { userChatsQuery, useUserChats } from '../../Shelters/useUserChats';
import { useUser } from '../../useUser';

export const loader =
  (queryClient) =>
  async ({ params }) => {
    try {
      const data = await queryClient.ensureQueryData(
        userAnimalsQuery('adopter')
      );

      const chats = await queryClient.ensureQueryData(
        userChatsQuery(params.username)
      );

      return { data, chats };
    } catch (error) {
      console.log({ error });
      toast.error('Error cargando perfil, ¿Estás logueado?');
      return error;
    }
  };

export const action =
  (closeBioModal, closeUpdatePasswordModal, queryClient) =>
  async ({ request }) => {
    let formData = await request.formData();
    let intent = formData.get('intent');

    if (intent === 'user-profile') {
      try {
        await updateProfile(formData, intent);
        queryClient.invalidateQueries({ queryKey: ['user'] });
        toast.success('Perfil actualizado');
        closeBioModal();
        return null;
      } catch (error) {
        if (isAxiosError(error) && error.response.status === 400)
          return toast.error('Error actualizando perfil');
        throw error;
      }
    }

    if (intent === 'remove-fav') {
      console.log({ formData });
      const id = formData.get('id');
      try {
        await deleteFav(id);
        queryClient.invalidateQueries([
          {
            queryKey: ['animals'],
          },
          {
            queryKey: ['user-favs', null],
          },
        ]);
        return null;
      } catch (error) {
        if (isAxiosError(error) && error.response.status === 400)
          return toast.error('Error al borrar de favoritos');
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

const AdopterProfile = () => {
  const params = useParams();
  const { data, isFetching } = useUser();
  const { isReady, send } = useWebSocketContext();
  const navigate = useNavigate();
  const { data: chats, isFetching: isFetchingChats } = useUserChats(
    params.username
  );
  const { username } = data;

  const handleCreateChat = (slug) => {
    if (isReady) {
      send(
        JSON.stringify({
          type: 'create-chat-room',
          room: slug,
        })
      );
    }
    navigate(`/private/chat/${slug}`);
  };

  return (
    <main className="bg-default-100 flex-grow">
      <section
        id="adopterProfile"
        className="max-w-screen-xl w-full flex  flex-col justify-center  gap-12 h-full  py-12  mx-auto "
      >
        <TitleSection title={username} id="adopterTitle" />
        <section id="sheltersProfile" className="flex gap-12 max-lg:flex-col ">
          <main className="flex flex-col max-w-3xl order-1 max-lg:order-2 mx-auto">
            <section className="mt-5">
              <ImagesFrame images={data.avatar} page="update-user" limit={1} />
            </section>
            <section id="petsTable" className="lg:pt-16">
              <Form method="POST" preventScrollReset={true}>
                <StatusAnimalsTable role={'adopter'} />
              </Form>
            </section>
          </main>
          <aside>
            <Skeleton isLoaded={!isFetching}>
              <UserBioInfo data={data} isLoading={isFetching} />
            </Skeleton>
            <H2Title title="Seguridad" className="" />
            <UserChangePassword />
          </aside>
        </section>

        <footer className="border-solid border-t-1 border-t-danger py-8 h-100 flex justify-center">
          <DeleteUserModal />
        </footer>
      </section>
    </main>
  );
};

export default AdopterProfile;
