import { Button } from '@nextui-org/react';
export const AdoptButton = ({ className }) => {
  return (
    <Button size='md' color='primary' className={`${className} w-32`}>
      <span className='font-lobster text-xl text-white'>Adoptar</span>
    </Button>
  );
};
