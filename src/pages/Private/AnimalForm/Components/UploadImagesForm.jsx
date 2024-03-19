import { H3Title } from '../../../../components';
import AddImagesModal from './AddImagesModal';
import DeleteImageModal from './DeleteImageModal';
import { useAnimalImagesContext } from '../../../../context/AnimalImagesContext';

export const UploadImagesForm = () => {
  const { images, setImages } = useAnimalImagesContext();

  return (
    <div id="images" className="flex flex-col gap-5 mx-3 mt-4">
      <H3Title title="Imágenes:" />
      <div className="grid grid-cols-3 max-sm:grid-cols-1 max-md:grid-cols-2 max-sm:justify-items-center gap-x-5 gap-y-5 ">
        {images?.length < 6 && (
          <div className="imageProfile w-60 h-32 ">
            <AddImagesModal onSetImages={setImages} />
          </div>
        )}
        {images?.map((image, index) => (
          <div
            className={`relative imageProfile w-60 h-32 border-solid border-3 border-${
              index === 0 ? 'primary' : 'secondary'
            }`}
            key={`${image.name}-${index}`}
          >
            <img
              className="h-full w-full object-cover"
              src={URL.createObjectURL(image)}
              alt={image.name}
            />
            <DeleteImageModal name={image.name} onSetImages={setImages} />
          </div>
        ))}
      </div>
    </div>
  );
};
