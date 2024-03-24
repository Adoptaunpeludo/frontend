import { Skeleton, Spinner } from '@nextui-org/react';
import { H2Title, H3Title } from '../../../../../components';
import Accommodations from './Acommodations';
import ShelterForm from '../../ShelterForm/ShelterForm';
import { ImagesFrame } from '../../../shared';
import {
  IconBrandFacebook,
  IconBrandInstagram,
  IconBrandX,
} from '@tabler/icons-react';
import SocialMediaForm from '../../ShelterForm/components/SocialMediaForm';

const ShelterProfileInfo = ({ data, isLoading }) => {
  const {
    cif,
    legalForms,
    veterinaryFacilities,
    ownVet,
    facilities,
    description,
    images,
    socialMedia,
  } = data;

  return (
    <Skeleton isLoaded={!isLoading} className="flex flex-col gap-4 ">
      <div
        id="Profile"
        className="flex flex-col gap-4 border-solid border-b-1 border-b-primary"
      >
        <H2Title title="Protectora" />
        <div id="legalFrame" className="flex gap-5 mx-3">
          <span id="cif">CIF: {cif}</span>
          <span id="legalForm">Forma legal: {legalForms}</span>
        </div>
        <div id="facilities" className="flex flex-col gap-2 mx-3">
          <H3Title title="Instalaciones" />
          <div id="veterinarianFacilities" className="flex gap-5 mx-3">
            <span>
              Instalaciones veterinarias: {veterinaryFacilities ? 'si' : 'no'}
            </span>
            <span>Veterinario propio: {ownVet ? 'si' : 'no'}</span>
          </div>
        </div>
        {isLoading ? <Spinner /> : <Accommodations facilities={facilities} />}
        <div id="description" className="flex flex-col gap-3 mx-3 py-3">
          <H3Title title="Descripción:" />
          <div>{description}</div>
        </div>
        <ShelterForm data={data} />
        <ImagesFrame images={images} page="update-user" />
        <div id="socialMedia" className="flex flex-col gap-3 mx-3 py-3 ">
          <H3Title title="Redes sociales:" />
          <div className="flex gap-4 justify-between max-sm:flex-col max-sm:mx-auto">
            {socialMedia.map((media) => (
              <div className="flex items-center gap-2" key={media.name}>
                {media.name === 'facebook' && <IconBrandFacebook />}
                {media.name === 'xtweet' && <IconBrandX />}
                {media.name === 'instagram' && <IconBrandInstagram />}
                {media.url === '' ? <span>Vacio</span> : media.url}
              </div>
            ))}
          </div>
        </div>
      </div>
      <SocialMediaForm socialMedia={socialMedia} />
    </Skeleton>
  );
};

export default ShelterProfileInfo;
