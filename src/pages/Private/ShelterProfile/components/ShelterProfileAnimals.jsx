import {
  UilMapMarker,
  UilMars,
  UilSchedule,
  UilVenus
} from '@iconscout/react-unicons';
import {
  Button,
  Chip,
  Table,
  TableBody,
  TableCell,
  TableColumn,
  TableHeader,
  TableRow,
  Tooltip
} from '@nextui-org/react';
import { IconEdit, IconEye, IconTrashXFilled } from '@tabler/icons-react';
import React from 'react';
import { PetSize } from '../../../../assets/svg';

const columns = [
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
    uid: 'actions'
  }
];

const users = [
  {
    id: 1,
    pet: 'Nera',
    size: 'small',
    gender: 'male',
    age: '29',
    location: 'Granada',
    publishStatus: 'publicado',
    status: 'Esperando Hogar'
  },
  {
    id: 2,
    pet: 'Nera',
    size: 'small',
    gender: 'male',
    age: '29',
    location: 'Granada',
    publishStatus: 'publicado',
    status: 'Esperando Hogar'
  },
  {
    id: 3,
    pet: 'Nera',
    size: 'small',
    gender: 'male',
    age: '29',
    location: 'Granada',
    publishStatus: 'publicado',
    status: 'reservado'
  },
  {
    id: 4,
    pet: 'Nera',
    size: 'small',
    gender: 'male',
    age: '29',
    location: 'Granada',
    publishStatus: 'pendiente',
    status: 'adoptado'
  },
  {
    id: 5,
    pet: 'Nera',
    size: 'small',
    gender: 'male',
    age: '29',
    location: 'Granada',
    publishStatus: 'rechazado',
    status: 'En Acogida'
  }
];

const statusColorMap = {
  'En Acogida': 'success',
  'Esperando Hogar': 'success',
  adoptado: 'danger',
  reservado: 'warning',
  publicado: 'success',
  pendiente: 'warning',
  rechazado: 'danger'
};

export const ShelterProfileAnimals = () => {
  const renderCell = React.useCallback((user, columnKey) => {
    const cellValue = user[columnKey];

    switch (columnKey) {
      case 'status':
        return (
          <Chip
            className='capitalize w-full'
            color={statusColorMap[user.status]}
            size='sm'
            variant='flat'
          >
            {cellValue}
          </Chip>
        );
      case 'publishStatus':
        return (
          <Chip
            className='capitalize w-full'
            color={statusColorMap[user.publishStatus]}
            size='sm'
            variant='flat'
          >
            {cellValue}
          </Chip>
        );
      case 'actions':
        return (
          <div className='relative flex items-center gap-2'>
            <Tooltip content='Ver Detalles'>
              <Button isIconOnly variant='solid' color='primary' size='sm'>
                <IconEye />
              </Button>
            </Tooltip>
            <Tooltip content='Editar peludo '>
              <Button isIconOnly variant='solid' color='primary' size='sm'>
                <IconEdit />
              </Button>
            </Tooltip>
            <Tooltip color='danger' content='Eliminar Peludo'>
              <Button isIconOnly variant='solid' color='danger' size='sm'>
                <IconTrashXFilled />
              </Button>
            </Tooltip>
          </div>
        );
      default:
        return cellValue;
    }
  }, []);

  return (
    <Table aria-label='Example table with custom cells'>
      <TableHeader columns={columns} className='flex justify-center'>
        {column => (
          <TableColumn key={column.uid} className='text-start '>
            {column.name}
          </TableColumn>
        )}
      </TableHeader>
      <TableBody items={users}>
        {item => (
          <TableRow key={item.id}>
            {columnKey => <TableCell>{renderCell(item, columnKey)}</TableCell>}
          </TableRow>
        )}
      </TableBody>
    </Table>
  );
};
