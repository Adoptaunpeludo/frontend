import { Button, Input, Spinner, Textarea } from '@nextui-org/react';
import { IconCircleX, IconSend2 } from '@tabler/icons-react';
import { Form } from 'react-router-dom';
import { boolDataEnum, legalFormEnum } from '../../../utils/enumData';
import {
  H2Title,
  H3Title,
  Hero,
  Panel,
  SelectField,
  AddButton,
} from '../../../components';

import Accommodations from '../ShelterProfile/components/Acommodations';
import { useShelterProfile } from '../ShelterProfile/useShelterProfile';
import { ImagesFrame } from '../shared/ImagesFrame';
import { SocialMediaTable } from './components';

const ShelterForm = () => {
  const { data, isLoading } = useShelterProfile();
  const {
    cif,
    legalForms,
    ownVet,
    description,
    veterinaryFacilities,
    facilities,
    images,
    socialMedia,
    userName,
  } = data;

  if (isLoading) return <Spinner />;
  return (
    <main className="bg-default-100">
      <Hero />
      <section
        id="userFormShelter"
        className="max-w-screen-xl w-full flex flex-col gap-3 h-full justify-center py-12 mx-auto "
      >
        <Panel className="my-14 max-w-4xl mx-auto">
          <Form className="flex flex-col gap-6 max-w-4xl mx-auto px-10 py-8">
            <H2Title title={userName} className="mx-auto" />
            <div className="flex flex-col w-full gap-4">
              {/* TODO: useInput hook to custom all inputs with the same styles  */}
              <div className="flex w-full flex-wrap md:flex-nowrap gap-4">
                <Input
                  className="min-w-72 "
                  type="text"
                  label="CIF"
                  name="cif"
                  placeholder={cif === '' ? '' : cif}
                />
                <SelectField
                  className="min-w-72 "
                  label="Forma legal"
                  name="legalForms"
                  dataField={legalForms}
                  dataEnum={legalFormEnum}
                />
              </div>
              <div className="flex w-full justify-around gap-4 flex-wrap md:flex-nowrap py-2">
                <SelectField
                  className="min-w-72 "
                  label="Instalaciones veterinarias"
                  name="veterinaryFacilities"
                  dataField={veterinaryFacilities}
                  dataEnum={boolDataEnum}
                />
                <SelectField
                  className="min-w-72 "
                  label="Veterinario propio"
                  name="ownVet"
                  dataField={ownVet}
                  dataEnum={boolDataEnum}
                />
              </div>
              <Accommodations facilities={facilities} isDisable={false} />
              <div className="flex w-full flex-col  gap-4">
                <H3Title title="Descripción:" className="mx-2" />
                <Textarea
                  className="w-full "
                  label="Descripción"
                  name="description"
                  placeholder={
                    description === '' ? 'Describe tu protectora' : description
                  }
                />
              </div>
              <div className="flex w-full flex-col  gap-4">
                <ImagesFrame images={images} />
              </div>
            </div>
            <div id="socialMedia" className="flex flex-col gap-3 mx-3 py-3 ">
              <H3Title title="Redes sociales:" />
              <div className="flex flex-col gap-4 border-solid border-b-1 border-t-1 border-t-primary border-b-primary pb-3 pt-3 max-sm:flex-col max-sm:mx-auto">
                {/* //TODO: Table component with RRSS */}
                <SocialMediaTable socialMedia={socialMedia} />
                <AddButton />
              </div>
            </div>

            <div className="flex justify-center gap-4 w-full">
              <Button
                color="primary"
                variant="solid"
                size="sm"
                startContent={<IconCircleX />}
                className="px-10 font-poppins font-semibold text-sm"
              >
                Cancelar
              </Button>
              <Button
                color="primary"
                variant="solid"
                size="sm"
                startContent={<IconSend2 />}
                className="px-10 font-poppins font-semibold text-sm"
              >
                Enviar
              </Button>
            </div>
          </Form>
        </Panel>
      </section>
    </main>
  );
};
export default ShelterForm;
