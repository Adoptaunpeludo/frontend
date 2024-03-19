import { Avatar, Button, Spinner, User } from '@nextui-org/react';
import { IconTrashXFilled } from '@tabler/icons-react';

import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';

import {
  AsideDataColumn,
  EditButton,
  H2Title,
  Hero,
  TitleSection,
} from '../../../../components';
import { useAuthContext } from '../../../../context/AuthContext';
import { useUser } from '../../../Layout/useUser';
import { StatusAnimalsTable, userInformation } from '../../shared';

const AdopterProfile = () => {
  const { data, isLoading } = useUser();
  const { isLoggedIn } = useAuthContext();
  const navigate = useNavigate();

  useEffect(() => {
    if (!isLoggedIn || !data) {
      toast.warn('Por favor primero haz login con tu cuenta');
      return navigate('/login');
    }
  }, [isLoggedIn, navigate, data]);

  if (isLoading) return <Spinner />;

  const { userName, avatar } = data;
  const userData = userInformation(data);

  return (
    <main className="bg-default-100 flex-grow">
      <Hero />
      <section
        id="adopterProfile"
        className="max-w-screen-xl w-full flex  flex-col justify-center  gap-12 h-full  py-12  mx-auto "
      >
        <TitleSection title={userName} id=" adopterTitle" />
        <section id="sheltersProfile" className="flex gap-12 max-lg:flex-col ">
          <main className="flex flex-col max-w-3xl order-1 max-lg:order-2 mx-auto">
            <section id="petsTable" className=" lg:pt-48">
              <StatusAnimalsTable role={'adopter'} />
            </section>
          </main>
          <aside className="w-96 flex flex-col order-2 max-lg:order-1 mx-auto">
            <div id="profileAside" className=" flex flex-col gap-5">
              <Avatar
                isBordered
                color="success"
                className="w-40 h-40 bg-white self-center"
                src={`/avatar/${avatar}`}
              />
              <div
                id="personalData"
                className="flex flex-col justify-start gap-4"
              >
                <H2Title title="Información" />

                <AsideDataColumn dataColumn={userData} />
              </div>
            </div>
            <EditButton />
            <div id="NotificationsAside">
              {/* TODO: how get information from database */}
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
            </div>
          </aside>
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