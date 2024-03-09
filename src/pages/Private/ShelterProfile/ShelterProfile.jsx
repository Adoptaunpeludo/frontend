import { Avatar, Button, User } from '@nextui-org/react';
import {
  IconBrandFacebook,
  IconBrandInstagram,
  IconBrandX,
  IconTrashXFilled
} from '@tabler/icons-react';
import {
  EditButton,
  H2Title,
  H3Title,
  Hero,
  TitleSection,
  UserInformation
} from '../../shared';
import { ImagesFrame } from '../shared/ImagesFrame';
import { StatusAnimalsTable } from '../shared/StatusAnimalsTable';
import Accommodations from './components/Acommodations';
import { useShelterProfile } from './useShelterProfile';

const ShelterProfile = () => {
  const { data, isLoading, isError } = useShelterProfile();
  if (isError) return <ErrorPage />;
  if (isLoading) return <Spinner />;
  const {
    cif,
    legalForms,
    veterinarianFacilities,
    ownVet,
    description,
    facilities,
    images
  } = data;

  return (
    <main className='bg-default-100'>
      <Hero />
      <section
        id='SheltersProfile'
        className='max-w-screen-xl w-full flex  flex-col justify-center  gap-12 h-full  py-12  mx-auto '
      >
        <TitleSection title='Rescates Peludos' id=' shelterTitle' />
        <section id='sheltersProfile' className='flex gap-12 max-lg:flex-col '>
          <main className='flex flex-col max-w-3xl order-1 max-lg:order-2'>
            <div
              id='Profile'
              className='flex flex-col gap-4 border-solid border-b-1 border-b-primary'
            >
              <H2Title title='Protectora' />
              <div id='legalFrame' className='flex gap-5 mx-3'>
                <span id='cif'>CIF: {cif}</span>
                <span id='legalForm'>Forma legal: {legalForms}</span>
              </div>
              <div id='facilities' className='flex flex-col gap-2 mx-3'>
                <H3Title title='Instalaciones' />
                <div id='veterinarianFacilities' className='flex gap-5 mx-3'>
                  <span>
                    Instalaciones veterinarias:{' '}
                    {veterinarianFacilities ? 'si' : 'no'}
                  </span>
                  <span>Veterinario propio: {ownVet ? 'si' : 'no'}</span>
                </div>
              </div>
              <Accommodations facilities={facilities} />
              <div id='description' className='flex flex-col gap-3 mx-3 py-3'>
                <H3Title title='Descripción:' />
                <div>{description}</div>
              </div>
              <ImagesFrame images={images} />
              <div id='socialMedia' className='flex flex-col gap-3 mx-3 py-3 '>
                <H3Title title='Redes sociales:' />
                <div className='flex gap-4 justify-between max-sm:flex-col max-sm:mx-auto'>
                  <div className='flex items-center gap-2'>
                    <IconBrandInstagram />
                    @peludos_felices
                  </div>
                  <div className='flex items-center gap-2'>
                    <IconBrandFacebook />
                    @peludos_felices
                  </div>
                  <div className='flex  items-center gap-2'>
                    <IconBrandX />
                    <span>@peludos_felices</span>
                  </div>
                </div>
              </div>
            </div>
            <EditButton />
          </main>
          <aside className='w-96 flex flex-col order-2 max-lg:order-1 mx-auto'>
            <div id='profileAside' className=' flex flex-col gap-5'>
              <Avatar
                isBordered
                color='success'
                className='w-40 h-40 bg-white self-center'
                src='/avatar/rescates-peludos.png'
              />
              <div
                id='personalData'
                className='flex flex-col justify-start gap-4'
              >
                <H2Title title='Información' />
                <UserInformation {...data} />
              </div>
            </div>
            <EditButton />
            <div id='NotificationsAside'>
              <H2Title title='Mensajes' className='pb-5' />
              <div className='flex justify-between border-solid border-b-1 border-b-primary pb-3 items-center'>
                <User
                  name='Jane Doe'
                  avatarProps={{
                    src: 'https://i.pravatar.cc/150?u=a04258114e29026702d',
                    isBordered: true,
                    color: 'success'
                  }}
                />
                {1}
              </div>
            </div>
          </aside>
        </section>
        <section id='petsTable' className='px-4'>
          <StatusAnimalsTable role={'shelter'} />
        </section>
        <footer className='border-solid border-t-1 border-t-danger py-8 h-100 flex justify-center'>
          <Button color='danger' size='lg' startContent={<IconTrashXFilled />}>
            Borrar Usuario
          </Button>
        </footer>
      </section>
    </main>
  );
};

export default ShelterProfile;
