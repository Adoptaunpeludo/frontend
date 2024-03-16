import {
  Button,
  Input,
  Modal,
  ModalBody,
  ModalContent,
  ModalFooter,
  ModalHeader,
  Spinner,
  Textarea,
  useDisclosure,
} from '@nextui-org/react';
import { IconCircleX, IconEdit, IconSend2 } from '@tabler/icons-react';
import { Form } from 'react-router-dom';
import { boolDataEnum, legalFormEnum } from '../../../utils/enumData';
import { H2Title, H3Title, Panel, SelectField } from '../../../components';

import Accommodations from '../ShelterProfile/components/Acommodations';

import { useUser } from '../../Layout/useUser';

const ShelterForm = () => {
  const { data, isLoading } = useUser();
  const { isOpen, onOpen, onOpenChange } = useDisclosure();
  const {
    cif,
    legalForms,
    ownVet,
    description,
    veterinaryFacilities,
    facilities,
    // socialMedia,
    username,
  } = data;

  if (isLoading) return <Spinner />;
  return (
    <Form className="bg-default-100 my-4">
      <Button
        color="primary"
        size="md"
        startContent={<IconEdit />}
        onPress={onOpen}
      >
        Editar
        <Modal
          isOpen={isOpen}
          onOpenChange={onOpenChange}
          className={`text-foreground bg-background border border-white`}
          size="3xl"
        >
          <ModalContent>
            {(onClose) => (
              <>
                <ModalHeader className="flex flex-col gap-1">
                  {/* <Hero /> */}
                  Actualizar Perfil
                </ModalHeader>
                <ModalBody>
                  <Panel className=" max-w-4xl mx-auto">
                    <div className="flex flex-col gap-6 mx-auto px-10 py-8">
                      <H2Title title={username} className="mx-auto" />
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
                        <Accommodations
                          facilities={facilities}
                          isDisable={false}
                        />
                        <div className="flex w-full flex-col  gap-4">
                          <H3Title title="Descripción:" className="mx-2" />
                          <Textarea
                            className="w-full "
                            label="Descripción"
                            name="description"
                            placeholder={
                              description === ''
                                ? 'Describe tu protectora'
                                : description
                            }
                          />
                        </div>
                      </div>
                    </div>
                  </Panel>
                </ModalBody>
                <ModalFooter className="flex justify-center gap-4 w-full">
                  <Button
                    color="primary"
                    variant="solid"
                    size="sm"
                    startContent={<IconCircleX />}
                    className="px-10 font-poppins font-semibold text-sm"
                    onPress={onClose}
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
                </ModalFooter>
              </>
            )}
          </ModalContent>
        </Modal>
      </Button>
    </Form>
  );
};
export default ShelterForm;
