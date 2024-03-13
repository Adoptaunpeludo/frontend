import { Input } from '@nextui-org/react';
import { H3Title } from '../../../shared';

const StatusShelterForm = ({ data }) => {
  const { status, city } = data;
  return (
    <div className='flex flex-col gap-2'>
      <H3Title title='Estado protectora' />
      <div className='flex w-full flex-wrap md:flex-nowrap gap-2 border-primary border-t-1 pt-3'>
        <Input
          className='min-w-72 '
          type='text'
          label='Status'
          name='status'
          placeholder={status === '' ? '' : status}
        />
        <Input
          className='min-w-72 '
          type='text'
          label='Ciudad'
          name='city'
          placeholder={city === '' ? '' : city}
        />
      </div>
    </div>
  );
};
export default StatusShelterForm;
