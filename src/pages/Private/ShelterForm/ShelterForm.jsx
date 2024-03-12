import {
  Button,
  Input,
  Select,
  SelectItem,
  Spinner,
  Textarea
} from '@nextui-org/react';
import { IconCircleX, IconSend2 } from '@tabler/icons-react';

import ErrorPage from '../../Error/ErrorPage';
import { H2Title, H3Title, Hero, Panel } from '../../shared';
import { legalFormEnum } from '../../shared/data/enumData';
import Accommodations from '../ShelterProfile/components/Acommodations';
import { useShelterProfile } from '../ShelterProfile/useShelterProfile';
import { ImagesFrame } from '../shared/ImagesFrame';

const ShelterForm = () => {
  const { data, isLoading, isError } = useShelterProfile();
  const {
    cif,
    legalForms,
    ownVet,
    description,
    veterinaryFacilities,
    facilities,
    images,
    socialMedia,
    userName
  } = data;
  if (isError) return <ErrorPage />;
  if (isLoading) return <Spinner />;
  return (
    <main className='bg-default-100'>
      <Hero />
      <section
        id='userFormShelter'
        className='max-w-screen-xl w-full flex flex-col gap-3 h-full justify-center py-12 mx-auto '
      >
        <Panel className='my-14 max-w-4xl mx-auto'>
          <form className='flex flex-col gap-6 max-w-4xl mx-auto px-10 py-8'>
            <H2Title title={userName} className='mx-auto' />
            <div className='flex flex-col w-full gap-4'>
              {/* TODO: useInput hook to custom all inputs with the same styles  */}
              <div className='flex w-full flex-wrap md:flex-nowrap gap-4'>
                <Input
                  className='min-w-72 '
                  type='text'
                  label='CIF'
                  placeholder={cif === '' ? '' : cif}
                />
                <Select
                  className='min-w-72 '
                  label='Forma legal '
                  defaultSelectedKeys={[legalForms === null ? ' ' : legalForms]}
                >
                  {legalFormEnum.map(legalForm => (
                    <SelectItem key={legalForm.value} value={legalForm.value}>
                      {legalForm.label}
                    </SelectItem>
                  ))}
                </Select>
              </div>
              <div className='flex w-full flex-wrap md:flex-nowrap gap-4'>
                {/* TODO: add radiobutton group for veterinarianFacilities and ownVet */}
              </div>
              <Accommodations facilities={facilities} isDisable='false' />
              <div className='flex w-full flex-col  gap-4'>
                <H3Title title='Descripción:' className='mx-2' />
                <Textarea
                  className='w-full '
                  type='tel'
                  label='Descripción'
                  placeholder={
                    description === '' ? 'Describe tu protectora' : description
                  }
                />
              </div>
              <div className='flex w-full flex-col  gap-4'>
                <ImagesFrame images={images} />
              </div>
            </div>
            <div id='socialMedia' className='flex flex-col gap-3 mx-3 py-3 '>
              <H3Title title='Redes sociales:' />
              <div className='flex gap-4 justify-between border-solid border-b-1 border-t-1 border-t-primary border-b-primary pb-3 max-sm:flex-col max-sm:mx-auto'>
                {/* //TODO: Table component with RRSS */}
                {/* //TODO: componet for add RRSS */}
              </div>
            </div>

            <div className='flex justify-center gap-4'>
              <Button
                color='primary'
                href='#'
                variant='solid'
                size='sm'
                startContent={<IconCircleX />}
                className='px-10 font-poppins font-semibold text-sm'
              >
                Cancelar
              </Button>
              <Button
                color='primary'
                href='#'
                variant='solid'
                size='sm'
                startContent={<IconSend2 />}
                className='px-10 font-poppins font-semibold text-sm'
              >
                Enviar
              </Button>
            </div>
          </form>
        </Panel>
      </section>
    </main>
  );
};
export default ShelterForm;
