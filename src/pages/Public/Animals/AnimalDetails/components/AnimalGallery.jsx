import { Image } from '@nextui-org/react';
import { BUCKET_URL } from '../../../../../config/config';

export const AnimalGallery = ({ animalImages, onSetImages }) => {
  const handleImageChange = (image, index) => {
    onSetImages((images) => {
      const newImages = [...images];
      const aux = newImages[0];
      newImages[0] = newImages[index];
      newImages[index] = aux;
      return newImages;
    });
  };

  return (
    <div id="gallery" className="flex py-4 justify-around">
      {animalImages.map(
        (image, index) =>
          index !== 0 && (
            <picture key={index} className="">
              <Image
                key={index}
                src={`${BUCKET_URL}/${image}`}
                className="aspect-auto h-16 object-cover cursor-pointer"
                radius="sm"
                onClick={() => handleImageChange(image, index)}
              />
            </picture>
          )
      )}
    </div>
  );
};
