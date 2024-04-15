import { Skeleton, Spinner } from '@nextui-org/react';
import {
  IconBrandFacebook,
  IconBrandInstagram,
  IconBrandX,
} from '@tabler/icons-react';
import { H2Title, H3Title } from '../../../../../components';
import { isNullDataField } from '../../../../../utils/asideDataFields';
import { boolDataEnum, legalFormEnum } from '../../../../../utils/enumData';
import { ImagesFrame } from '../../../shared';
import ShelterForm from '../../ShelterForm/ShelterForm';
import SocialMediaForm from '../../ShelterForm/components/SocialMediaForm';
import Accommodations from './Acommodations';

const ShelterProfileInfo = ({ data, isLoading, action }) => {
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
    <>
      <div
        id="Profile"
        className="flex flex-col gap-4 border-b-1 border-b-primary"
      >
        <Skeleton isLoaded={!isLoading}>
          <header>
            <H2Title title="Protectora" />
          </header>
        </Skeleton>
        <Skeleton isLoaded={!isLoading}>
          <main>
            <section className="border-b-1 border-primary mb-5">
              <div id="legalFrame" className="flex gap-5 mx-5 pb-5">
                <span id="cif" className="min-w-32 font-poppins">
                  CIF: {cif}
                </span>
                <span
                  id="legalForm"
                  className="font-poppins"
                >{`Forma legal: ${isNullDataField(
                  legalForms,
                  legalFormEnum
                )}`}</span>
              </div>

              <H3Title title="Instalaciones:" className="mx-5 pb-3" />
              <div
                id="veterinarianFacilities"
                className="flex gap-5 mx-10 font-poppins"
              >
                <span>
                  {`Instalaciones veterinarias: 
                  ${isNullDataField(veterinaryFacilities, boolDataEnum)}`}
                </span>
                <span>
                  Veterinario propio: {isNullDataField(ownVet, boolDataEnum)}
                </span>
              </div>

              {isLoading ? (
                <Spinner />
              ) : (
                <Accommodations
                  facilities={facilities}
                  className={'mx-7 pb-5'}
                />
              )}
            </section>
            <section className="min-h-48 border-b-1 border-primary mb-5">
              <div
                id="description"
                className="flex flex-col gap-3 mx-3 pb-10 font-poppins"
              >
                <H3Title title="Descripción:" />
                <span className="mx-3">
                  {description === '' ? 'Describe tu protectora' : description}
                </span>
              </div>
            </section>

            {/* Modal for ShelterData edit info  */}
            <ShelterForm data={data} action={action} />
          </main>
        </Skeleton>

        <footer>
          <Skeleton isLoaded={!isLoading}>
            <ImagesFrame images={images} page="update-user" />
          </Skeleton>

          <Skeleton isLoaded={!isLoading}>
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
          </Skeleton>
        </footer>
      </div>

      {/* Modal for Social media edit info  */}
      <SocialMediaForm socialMedia={socialMedia} />
    </>
  );
};

export default ShelterProfileInfo;
