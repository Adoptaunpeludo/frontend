import { Button } from '@nextui-org/react';
import { IconEdit } from '@tabler/icons-react';

export const EditButton = () => {
  return (
    <div id='edit-button' className='py-4 mx-2'>
      <Button color='primary' size='md' startContent={<IconEdit />}>
        Editar
      </Button>
    </div>
  );
};
