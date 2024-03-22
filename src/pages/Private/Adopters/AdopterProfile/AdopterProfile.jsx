import { Button } from '@nextui-org/react';
import { IconTrashXFilled } from '@tabler/icons-react';
import { Hero, TitleSection } from '../../../../components';
import { ImagesFrame, StatusAnimalsTable } from '../../shared';
import { useUser } from '../../useUser';
import { userAnimalsQuery } from '../../Shelters/useUserAnimals';

import UserBioInfo from '../../Shelters/ShelterProfile/components/UserBioInfo';
import { updateProfile } from '../../shared/service/updateUserService';
import { toast } from 'react-toastify';

export const loader = (queryClient) => async () => {
  try {
    const data = await queryClient.ensureQueryData(userAnimalsQuery('adopter'));

    return data;
  } catch (error) {
    console.log(error);
    return error;
  }
};

export const action =
  (closeBioModal, queryClient) =>
  async ({ request }) => {
    let formData = await request.formData();
    let intent = formData.get('intent');

    if (intent === 'user-profile') {
      try {
        await updateProfile(formData, intent);
        queryClient.invalidateQueries({ queryKey: ['user'] });
        toast.success('Perfil del Refugio actualizado');
        closeBioModal();
        return null;
      } catch (error) {
        console.log(error);
        toast.error('Error actualizando perfil del Refugio');
        return null;
      }
    }
  };

const AdopterProfile = () => {
  const { data, isFetching } = useUser();

  const { username } = data;

  return (
    <main className="bg-default-100 flex-grow">
      <Hero />
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
              <StatusAnimalsTable role={'adopter'} />
            </section>
          </main>
          <UserBioInfo data={data} isLoading={isFetching} />
          {/* <div id="NotificationsAside">
              <H2Title title="Mensajes" className="pb-5" />
              <div className="flex justify-between border-solid border-b-1 border-b-primary pb-3 items-center">
                <User
                  name="Galgos unidos"
                  avatarProps={{
                    src: `/avatar/${avatar}`,
                    isBordered: true,
                    color: 'success',
                  }}
                />
                {1}
              </div>
            </div> */}
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

export default AdopterProfile;
