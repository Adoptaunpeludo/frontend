import { useEffect } from 'react';
import { Link, useNavigation } from 'react-router-dom';
import { Button, Skeleton } from '@nextui-org/react';
import { IconEdit } from '@tabler/icons-react';

import { H2Title, TitleSection } from '../../../../components';
import { buttonStyleConfig } from '../../../../utils/configFormFields';
import { DeleteUserModal, StatusAnimalsTable } from '../../shared';
import { UserChangePassword } from '../../shared/components/UserChangePassword';
import ShelterProfileInfo from './components/ShelterProfileInfo';
import UserBioInfo from './components/UserBioInfo';

import { useUser } from '../../useUser';
import { useAnimalImagesContext } from '../../../../context/AnimalImagesContext';
import { action } from './action';

const ShelterProfile = () => {
  //const params = useParams();
  const { data: user, isFetching: isFetchingUser } = useUser();
  const navigation = useNavigation();
  const isLoading = navigation.state === 'loading';
  const { resetImages } = useAnimalImagesContext();
  //const navigate = useNavigate();

  useEffect(() => {
    resetImages();
  }, [resetImages]);

  return (
    <Skeleton isLoaded={!isLoading}>
      <main className="bg-default-100 flex-grow">
        <section
          id="SheltersProfile"
          className="max-w-screen-xl w-full flex  flex-col justify-center  h-full  py-12  mx-auto gap-5"
        >
          <TitleSection title={user?.username} id=" shelterTitle" />
          <section
            id="sheltersProfile"
            className="flex gap-12 max-lg:flex-col "
          >
            <main className="flex flex-col max-w-3xl order-1 ">
              <ShelterProfileInfo
                isLoading={isFetchingUser}
                data={user}
                action={action}
              />
            </main>
            <aside className="order-2">
              <Skeleton isLoaded={!isFetchingUser}>
                <UserBioInfo data={user} isLoading={isFetchingUser} />
              </Skeleton>
              <section
                className={`${
                  user.accountType === 'google' && 'hidden'
                } w-96 flex flex-col mx-auto`}
              >
                <H2Title title="Seguridad" className="" />
                <UserChangePassword />
              </section>
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
    </Skeleton>
  );
};

export default ShelterProfile;
