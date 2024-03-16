import { H3Title } from '../../../components';
import { BUCKET_URL } from '../../../config/config';
import ImageUploadModal from './ImageUploadModal';

export const ImagesFrame = ({ images }) => {
  return (
    <div id="images" className="flex flex-col gap-5 mx-3">
      <H3Title title="Imágenes:" />
      <div className="grid grid-cols-3 max-sm:grid-cols-1 max-md:grid-cols-2 max-sm:justify-items-center gap-x-5 gap-y-5 ">
        {images.length < 6 && (
          <div className="imageProfile w-60 h-32 ">
            <ImageUploadModal />
          </div>
        )}
        {images.map((image, index) => (
          <div
            className={`imageProfile w-60 h-32 border-solid border-3 border-${
              index === 0 ? 'primary' : 'secondary'
            }`}
            key={image}
          >
            <img
              className="h-full w-full object-cover"
              src={`${BUCKET_URL}/${image}`}
            />
          </div>
        ))}
      </div>
    </div>
  );
};
