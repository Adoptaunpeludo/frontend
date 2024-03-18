import { Button } from '@nextui-org/react';
import { IconSquarePlus } from '@tabler/icons-react';

export const AddButton = () => {
  return (
    <div id='add-button' className='py-4 mx-2'>
      <Button color='primary' size='md' startContent={<IconSquarePlus />}>
        Añadir
      </Button>
    </div>
  );
};
