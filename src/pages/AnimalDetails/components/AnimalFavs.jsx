import { IconHeart } from '@tabler/icons-react';
export const AnimalFavs = ({ numFavs }) => {
  return (
    <section id='likes' className='flex'>
      <span className='font-poppins font-semibold text-6xl'>{numFavs}</span>
      <IconHeart className='fill-primary stroke-primary size-14' />
    </section>
  );
};

export default AnimalFavs;
