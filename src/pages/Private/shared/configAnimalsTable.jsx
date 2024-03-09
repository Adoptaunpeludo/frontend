export const statusColorMap = {
  'En Acogida': 'success',
  'Esperando Hogar': 'success',
  adoptado: 'danger',
  reservado: 'warning',
  publicado: 'success',
  pendiente: 'warning',
  rechazado: 'danger'
};
import {
  UilMapMarker,
  UilMars,
  UilSchedule,
  UilVenus
} from '@iconscout/react-unicons';

import { PetSize } from '../../../assets/svg';

// ***************************  Array for shelters table Header **************************

export const columnsShelter = [
  {
    name: (
      <span className='text-tertiary font-semibold font-poppins uppercase'>
        peludo
      </span>
    ),
    uid: 'pet'
  },
  { name: <PetSize />, uid: 'size' },
  {
    name: (
      <span className='flex'>
        <UilVenus className='fill-tertiary' />
        <UilMars className='fill-tertiary' />
      </span>
    ),
    uid: 'gender'
  },
  { name: <UilSchedule className='fill-tertiary' />, uid: 'age' },
  { name: <UilMapMarker className='fill-tertiary' />, uid: 'location' },
  {
    name: (
      <span className='text-tertiary font-semibold font-poppins uppercase'>
        Publicación
      </span>
    ),
    uid: 'publishStatus'
  },
  {
    name: (
      <span className='text-tertiary font-semibold font-poppins uppercase'>
        status
      </span>
    ),
    uid: 'status'
  },
  {
    name: (
      <span className='text-tertiary font-semibold font-poppins uppercase'>
        acciones
      </span>
    ),
    uid: 'actionsShelter'
  }
];
//********************************************************************************* */

// ***************************  Array for adopters table Header **************************

export const columnsAdopter = [
  {
    name: (
      <span className='text-tertiary font-semibold font-poppins uppercase'>
        peludo
      </span>
    ),
    uid: 'pet'
  },
  { name: <PetSize />, uid: 'size' },
  {
    name: (
      <span className='flex'>
        <UilVenus className='fill-tertiary' />
        <UilMars className='fill-tertiary' />
      </span>
    ),
    uid: 'gender'
  },
  { name: <UilSchedule className='fill-tertiary' />, uid: 'age' },
  { name: <UilMapMarker className='fill-tertiary' />, uid: 'location' },

  {
    name: (
      <span className='text-tertiary font-semibold font-poppins uppercase'>
        status
      </span>
    ),
    uid: 'status'
  },
  {
    name: (
      <span className='text-tertiary font-semibold font-poppins uppercase'>
        acciones
      </span>
    ),
    uid: 'actionsAdopter'
  }
];
//********************************************************************************* */
