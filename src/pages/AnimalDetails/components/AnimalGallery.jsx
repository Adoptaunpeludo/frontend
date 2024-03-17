import { Image } from '@nextui-org/react';
import { BUCKET_URL_ANIMALS } from '../../../config/config';
export const AnimalGallery = ({ animalImages }) => {
  const images = [];

  for (let i = 1; i < 6; i++) {
    images.push(
      <picture key={i} className=' '>
        <Image
          key={i}
          src={`${BUCKET_URL_ANIMALS}/${animalImages[i]}`}
          // fallbackSrc={`${BUCKET_URL_ANIMALS}/${animalImages[0]}`}
          className=' aspect-auto h-16 object-cover'
          radius='sm'
        />
      </picture>
    );
  }

  return (
    <div id='gallery' className='flex py-4 justify-around'>
      {images}
    </div>
  );
};
