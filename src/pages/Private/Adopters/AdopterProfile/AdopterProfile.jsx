import { Skeleton } from '@nextui-org/skeleton';
import { Form, useNavigation } from 'react-router-dom';
import { H2Title, TitleSection } from '../../../../components';
import { DeleteUserModal, ImagesFrame, StatusAnimalsTable } from '../../shared';
//import { useWebSocketContext } from '../../../../context/WebSocketContext';
import UserBioInfo from '../../Shelters/ShelterProfile/components/UserBioInfo';
import { UserChangePassword } from '../../shared/components/UserChangePassword';
import { useUser } from '../../useUser';
import { action } from './action';

const AdopterProfile = () => {
  const { data, isFetching } = useUser();
  const { username } = data;
  const navigation = useNavigation();

  const isLoading = navigation.state === 'loading';

  return (
    <Skeleton isLoaded={!isLoading}>
      <main className="bg-default-100 flex-grow">
        <section
          id="adopterProfile"
          className="max-w-screen-xl w-full flex  flex-col justify-center  gap-12 h-full  py-12  mx-auto "
        >
          <TitleSection title={username} id="adopterTitle" />
          <section
            id="sheltersProfile"
            className="flex gap-12 max-lg:flex-col "
          >
            <main className="flex flex-col max-w-3xl order-1 max-lg:order-2 mx-auto">
              <section className="my-5">
                <ImagesFrame
                  images={data.avatar}
                  page="update-user"
                  limit={1}
                />
              </section>
              <section id="petsTable" className="lg:pt-16 max-sm:w-96">
                <Form method="POST" preventScrollReset={true}>
                  <StatusAnimalsTable role={'adopter'} />
                </Form>
              </section>
            </main>
            <aside>
              <Skeleton isLoaded={!isFetching}>
                <UserBioInfo
                  data={data}
                  isLoading={isFetching}
                  action={action}
                />
              </Skeleton>
              <section
                className={`${
                  data.accountType === 'google' && 'hidden'
                } w-96 flex flex-col mx-auto`}
              >
                <H2Title title="Seguridad" className="" />
                <UserChangePassword />
              </section>
            </aside>
          </section>

          <footer className="border-solid border-t-1 border-t-danger py-8 h-100 flex justify-center">
            <DeleteUserModal />
          </footer>
        </section>
      </main>
    </Skeleton>
  );
};

export default AdopterProfile;
