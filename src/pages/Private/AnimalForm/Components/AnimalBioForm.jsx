import { Input } from '@nextui-org/react';
import { H3Title } from '../../../shared';

const AnimalBioForm = ({ data }) => {
  const { name, age, breed, size, gender } = data;
  return (
    <div className='flex flex-col gap-2'>
      <H3Title title='Bio' />
      <div className='flex w-full flex-wrap md:flex-nowrap gap-2 border-primary border-t-1 pt-3'>
        <Input
          className='min-w-72 '
          type='text'
          label='Nombre'
          name='name'
          placeholder={name === '' ? '' : name}
        />
        <Input
          className='min-w-72 '
          type='text'
          label='Raza'
          name='breed'
          placeholder={breed === '' ? '' : breed}
        />
      </div>
      <div className='flex w-full flex-wrap md:flex-nowrap gap-2'>
        <Input
          className=''
          type='text'
          label='Edad'
          name='age'
          placeholder={age === '' ? '' : age}
        />
        <Input
          className=''
          type='text'
          label='Sexo'
          name='gender'
          placeholder={gender === '' ? '' : gender}
        />
        <Input
          className=' '
          type='text'
          label='Tamaño'
          name='size'
          placeholder={size === '' ? '' : size}
        />
      </div>
    </div>
  );
};
export default AnimalBioForm;
