import { Avatar, Button, Checkbox, User } from '@nextui-org/react';
import {
  IconBrandFacebook,
  IconBrandInstagram,
  IconBrandX,
  IconEdit,
  IconTrashXFilled
} from '@tabler/icons-react';
import {
  H2Title,
  H3Title,
  H4Title,
  Hero,
  ProfileAsideField,
  TitleSection
} from '../../shared';
import { useShelterProfile } from './useShelterProfile';

const ShelterProfile = () => {
  const { data, isLoading, isError } = useShelterProfile();
  if (isError) return <ErrorPage />;
  if (isLoading) return <Spinner />;
  const { cif, legalForm, veterinarianFacilities, ownVet, description } = data;
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
                    Instalaciones veterinarias: {veterinarianFacilities}
                  </span>
                  <span>Veterinario propio: {ownVet}</span>
                </div>
              </div>
              <div id='accommodations' className='flex flex-col gap-2 mx-3'>
                <H4Title title='Alojamientos' />
                <div
                  id='accommodationsCheck'
                  className='flex flex-wrap gap-5 mx-7'
                >
                  <Checkbox radius='none' size='sm'>
                    Hogares de acogida
                  </Checkbox>
                  <Checkbox radius='none' size='sm'>
                    Instalaciones municipales o públicas
                  </Checkbox>
                  <Checkbox radius='none' size='sm'>
                    Instalaciones arrendadas
                  </Checkbox>
                  <Checkbox radius='none' size='sm'>
                    Instalaciones propias
                  </Checkbox>
                  <Checkbox radius='none' size='sm'>
                    Residencias privadas (arrendadas)
                  </Checkbox>
                </div>
              </div>
              <div id='description' className='flex flex-col gap-3 mx-3 py-3'>
                <H3Title title='Descripción:' />
                <div>{description}</div>
              </div>
              <div id='images' className='flex flex-col gap-5 mx-3'>
                <H3Title title='Imágenes:' />
                <div className='grid grid-cols-3 max-sm:grid-cols-1 max-md:grid-cols-2 max-sm:justify-items-center gap-x-5 gap-y-5 '>
                  <div className=' imageProfile w-60 h-32 border-solid border-3 border-primary'></div>
                  <div className=' imageProfile w-60 h-32 border-solid border-3 border-secondary'></div>
                  <div className=' imageProfile w-60 h-32 border-solid border-3 border-secondary'></div>
                  <div className=' imageProfile w-60 h-32 border-solid border-3 border-secondary'></div>
                  <div className=' imageProfile w-60 h-32 border-solid border-3 border-secondary'></div>
                  <div className=' imageProfile w-60 h-32 border-solid border-3 border-secondary'></div>
                </div>
              </div>
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
            <div id='edit-button' className='py-4 mx-2'>
              <Button color='primary' size='md' startContent={<IconEdit />}>
                Editar
              </Button>
            </div>
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

                <ProfileAsideField
                  fieldName='Fecha de entrada:'
                  fieldValue='01/01/2024'
                />
                <ProfileAsideField
                  fieldName='Fecha de entrada:'
                  fieldValue='01/01/2024'
                />
                <ProfileAsideField
                  fieldName='Fecha de entrada:'
                  fieldValue='01/01/2024'
                />
                <ProfileAsideField
                  fieldName='Fecha de entrada:'
                  fieldValue='01/01/2024'
                />
                <ProfileAsideField
                  fieldName='Fecha de entrada:'
                  fieldValue='01/01/2024'
                />
                <ProfileAsideField
                  fieldName='Fecha de entrada:'
                  fieldValue='01/01/2024'
                />
              </div>
            </div>
            <div id='editButtonAside' className='py-4 mx-4'>
              <Button color='primary' size='md' startContent={<IconEdit />}>
                Editar
              </Button>
            </div>
            <div id='NotificationsAside'>
              <H2Title title='Mensajes' className='pb-5' />

              <div className='flex justify-between border-solid border-b-1 border-b-primary pb-3'>
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
        <section id='petsTable'></section>
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
