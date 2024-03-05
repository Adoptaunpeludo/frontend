import { Button, Checkbox } from '@nextui-org/react';
import {
  IconBrandFacebook,
  IconBrandInstagram,
  IconBrandX,
  IconEdit,
  IconTrashXFilled
} from '@tabler/icons-react';
import { Hero, TitleSection } from '../shared';

const SheltersProfile = ({
  cif = 'X.99.999.999',
  legalForm = 'Asociacion',
  veterinarianFacilities = 'si',
  ownVet = 'si',
  description = 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Duis ultricies dapibus leo, sed tempus dolor commodo vel. Cras non metus in ex condimentum congue id eu lacus. Etiam eleifend interdum mollis. Nunc ante erat, laoreet nec ante gravida, mattis euismod turpis. Aliquam dictum egestas lectus vitae rutrum. Curabitur ornare faucibus sapien nec semper. Nam eget fringilla velit.'
}) => {
  return (
    <main className='bg-default-100'>
      <Hero />

      <section
        id='SheltersProfile'
        className='max-w-screen-xl w-full flex  flex-col justify-center  gap-12 h-full  py-12  mx-auto'
      >
        <TitleSection title='Rescates Peludos' id=' shelterTitle' />
        <section id='sheltersProfile' className='flex gap-12'>
          <main className='flex flex-col max-w-3xl'>
            <div id='Profile' className='flex flex-col gap-4 '>
              <div
                id='shelterTitle'
                className='font-poppins text-2xl font-semibold mx-2'
              >
                Protectora
              </div>
              <div id='legalFrame' className='flex gap-5 mx-3'>
                <span id='cif'>CIF: {cif}</span>
                <span id='legalForm'>Forma legal: {legalForm}</span>
              </div>
              <div id='facilities' className='flex flex-col gap-2 mx-3'>
                <div
                  id='facilitiesTitle'
                  className='font-poppins text-base font-semibold'
                >
                  Instalaciones
                </div>
                <div id='veterinarianFacilities' className='flex gap-5 mx-3'>
                  <span>
                    Instalaciones veterinarias: {veterinarianFacilities}
                  </span>
                  <span>Veterinario propio: {ownVet}</span>
                </div>
              </div>
              <div id='accommodations' className='flex flex-col gap-2 mx-3'>
                <div
                  id='accommodationsTitle'
                  className='font-poppins text-base font-medium mx-3'
                >
                  Alojamientos
                </div>
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
                <div
                  id='descriptionTitle'
                  className='font-poppins text-base font-semibold '
                >
                  Descripción:
                </div>
                <div>{description}</div>
              </div>
              <div id='images' className='flex flex-col gap-5 mx-3'>
                <div
                  id='imagesTitle'
                  className='font-poppins text-base font-semibold '
                >
                  Imágenes:
                </div>
                <div className='grid grid-cols-3 max-sm:grid-cols-1 max-md:grid-cols-2 max-sm:justify-items-center gap-x-5 gap-y-5 '>
                  <div className=' imageProfile w-60 h-32 border-solid border-3 border-primary'></div>
                  <div className=' imageProfile w-60 h-32 border-solid border-3 border-secondary'></div>
                  <div className=' imageProfile w-60 h-32 border-solid border-3 border-secondary'></div>
                  <div className=' imageProfile w-60 h-32 border-solid border-3 border-secondary'></div>
                  <div className=' imageProfile w-60 h-32 border-solid border-3 border-secondary'></div>
                  <div className=' imageProfile w-60 h-32 border-solid border-3 border-secondary'></div>
                </div>
              </div>
              <div
                id='socialMedia'
                className='flex flex-col gap-3 mx-3 py-3 border-solid border-b-1 border-b-primary'
              >
                <div
                  id='socialMediaTitle'
                  className='font-poppins text-base font-semibold '
                >
                  Redes sociales:
                </div>
                <div className='flex gap-4 justify-between'>
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
            <div id='edit-button' className='py-4'>
              <Button color='primary' size='md' startContent={<IconEdit />}>
                Editar
              </Button>
            </div>
          </main>
          <aside></aside>
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

export default SheltersProfile;
