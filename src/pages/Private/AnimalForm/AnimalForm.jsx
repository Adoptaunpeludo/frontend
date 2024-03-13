import {
  Button,
  Radio,
  RadioGroup,
  Spinner,
  Textarea
} from '@nextui-org/react';
import { IconCircleX, IconSend2 } from '@tabler/icons-react';
import { useState } from 'react';
import { Form } from 'react-router-dom';
import { useAnimalDetails } from '../../AnimalDetails/useAnimalDetails';
import ErrorPage from '../../Error/ErrorPage';
import { H2Title, H4Title, Hero, Panel } from '../../shared';
import { ImagesFrame } from '../shared/ImagesFrame';
import {
  AnimalBioForm,
  OtherPropertiesCatForm,
  OtherPropertiesDogForm,
  StatusShelterForm
} from './Components';

const AnimalForm = () => {
  const { data, isLoading, isError } = useAnimalDetails();
  const { type, description } = data;
  if (isError) return <ErrorPage />;
  if (isLoading) return <Spinner />;
  const [pet, usePet] = useState(type);
  return (
    <main className='bg-default-100'>
      <Hero />
      <section className='max-w-screen-xl w-full flex flex-col gap-3 h-full justify-center py-12 mx-auto '>
        <Panel className=' max-w-4xl mx-auto flex flex-col py-4 px-10 justify-center'>
          <H2Title title='Peludo' className='mx-auto pb-5' />
          <div className='max-w-96 flex flex-col justify-center rounded-lg bg-default-100 mx-auto px-10 py-2'>
            <RadioGroup
              orientation='horizontal'
              name='type'
              className='flex justify-center font-semibold'
              value={pet}
              onValueChange={usePet}
              isReadOnly={type}
            >
              <Radio value={'cat'}>Gato</Radio>
              <Radio value={'dog'}>Perro</Radio>
            </RadioGroup>
          </div>
          <Form className='flex flex-col gap-6 max-w-4xl mx-auto px-10 '>
            <div className='flex w-full flex-col gap-4'>
              <AnimalBioForm data={data} />
              {pet === 'cat' && <OtherPropertiesCatForm data={data} />}
              {pet === 'dog' && <OtherPropertiesDogForm data={data} />}
              <StatusShelterForm data={data} />
              <H4Title title='Descripción:' className='mx-2' />
              <Textarea
                className='w-full '
                type='tel'
                label='Descripción'
                placeholder={
                  description === '' ? 'Describe tu protectora' : description
                }
              />
              <ImagesFrame />
              <div className='flex justify-center gap-4 w-full'>
                <Button
                  color='primary'
                  variant='solid'
                  size='sm'
                  startContent={<IconCircleX />}
                  className='px-10 font-poppins font-semibold text-sm'
                >
                  Cancelar
                </Button>
                <Button
                  color='primary'
                  variant='solid'
                  size='sm'
                  startContent={<IconSend2 />}
                  className='px-10 font-poppins font-semibold text-sm'
                >
                  Enviar
                </Button>
              </div>
            </div>
          </Form>
        </Panel>
      </section>
    </main>
  );
};
export default AnimalForm;
