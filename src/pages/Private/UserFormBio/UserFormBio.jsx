import { Avatar, Button, Input, Link } from '@nextui-org/react';
import { IconCircleX, IconSend2 } from '@tabler/icons-react';
import { cities } from '../../../utils/enumData';
import { H2Title, Hero, Panel, SelectField } from '../../shared';
import { useFormBio } from './useFormBio';
export const UserFormBio = () => {
  const { data, isLoading, isError } = useFormBio();
  if (isError) return <ErrorPage />;
  if (isLoading) return <Spinner />;
  const {
    userName,
    avatar,
    role,
    dni,
    firstName,
    lastName,
    phone_number,
    city
  } = data;
  return (
    <main className='bg-default-100'>
      <Hero />
      <section
        id='userFormBio'
        className='max-w-screen-xl w-full flex flex-col gap-3 h-full justify-center py-12 mx-auto '
      >
        <Panel className='my-14 max-w-4xl mx-auto'>
          <form className='flex flex-col gap-6 max-w-4xl mx-auto px-10 py-8'>
            <Avatar
              className='w-40 h-40 bg-white self-center'
              src={`/avatar/${avatar}`}
            />
            <H2Title title={userName} className='mx-auto' />
            <div className='flex flex-col w-full gap-4'>
              {/* TODO: useInput hook to custom all inputs with the same styles  */}
              <div className='flex w-full flex-wrap md:flex-nowrap gap-4'>
                <Input
                  className='min-w-72 '
                  type='file'
                  label='Añade una foto' //TODO: check props for this input
                  placeholder='  '
                ></Input>
                <Input
                  className='min-w-72 '
                  type='text'
                  label='DNI'
                  placeholder={dni === '' ? 'Introduce tu email' : dni}
                />
              </div>
              <div className='flex w-full flex-wrap md:flex-nowrap gap-4'>
                <Input
                  className='min-w-72 '
                  type='text'
                  label='Nombre'
                  placeholder={
                    firstName === '' ? 'Introduce tu nombre' : firstName
                  }
                />
                <Input
                  className='min-w-72 '
                  type='text'
                  label='Apellidos'
                  placeholder={
                    lastName === '' ? 'Introduce tus apellidos' : lastName
                  }
                />
              </div>
              <div className='flex w-full flex-wrap md:flex-nowrap gap-4'>
                <Input
                  className='min-w-72 '
                  type='tel'
                  label='Teléfono'
                  placeholder={
                    firstName === '' ? 'Introduce tu teléfono' : phone_number
                  }
                />
                <SelectField
                  label='Ciudad'
                  className='min-w-72'
                  dataField={city}
                  dataEnum={cities}
                />
              </div>
            </div>

            <div className='flex justify-center gap-4'>
              <Button
                as={Link}
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
                as={Link}
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
export default UserFormBio;
