import {
  Button,
  Input,
  Modal,
  ModalBody,
  ModalContent,
  ModalFooter,
  ModalHeader,
  Textarea,
  useDisclosure,
} from '@nextui-org/react';
import { IconCircleX, IconEdit, IconSend2 } from '@tabler/icons-react';

import { H2Title, H3Title, Panel, SelectField } from '../../../../components';
import { boolDataEnum, legalFormEnum } from '../../../../utils/enumData';

import Accommodations from '../ShelterProfile/components/Acommodations';

import { useEffect, useState } from 'react';
import { Form, useNavigation } from 'react-router-dom';
import { useModalContext } from '../../../../context/ModalContext';
import {
  buttonStyleConfig,
  inputStyleConfig,
  selectStyleConfig,
} from '../../../../utils/configFormFields';
import { validateField } from '../../../../utils/validateField';

const ShelterForm = ({ isSubmitting, data }) => {
  const updateShelterModal = useDisclosure();
  const { isOpen, onOpen, onOpenChange, onClose } = updateShelterModal;
  const { saveShelterModal } = useModalContext();
  const [cifError, setCifError] = useState('');

  const navigation = useNavigation();

  isSubmitting = navigation.state === 'submitting';

  const handleChange = (event) => {
    const value = event.target.value;
    const validateCif = validateField('cif', value);
    setCifError(validateCif);
  };

  useEffect(() => {
    setCifError('');
  }, [isOpen]);

  const isFormValid = !!cifError;

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

  useEffect(() => {
    saveShelterModal(updateShelterModal);
  }, []);

  return (
    <Button
      color="primary"
      size="md"
      startContent={<IconEdit />}
      onPress={onOpen}
      className={buttonStyleConfig}
    >
      Editar
      <Modal
        isOpen={isOpen}
        onOpenChange={onOpenChange}
        placement="center"
        scrollBehavior="outside"
        className={`text-foreground bg-background border border-white`}
        size="3xl"
      >
        <Form method="post" preventScrollReset={true}>
          <ModalContent>
            <>
              <ModalHeader className="flex flex-col gap-1">
                <H3Title
                  title="Actualiza los datos de tu protectora"
                  className="border-b-1 border-primary normal-case"
                />
              </ModalHeader>

              <ModalBody>
                <Panel className=" max-w-4xl mx-auto">
                  <div className="flex flex-col gap-6 mx-auto px-10 py-8">
                    <H2Title title={username} className="mx-auto" />
                    <div className="flex flex-col w-full gap-4">
                      <div className="flex w-full flex-wrap md:flex-nowrap gap-4">
                        <Input
                          className="min-w-72 "
                          type="text"
                          label="CIF"
                          name="cif"
                          defaultValue={cif === '' ? '' : cif}
                          isDisabled={isSubmitting}
                          color={cifError ? 'danger' : 'none'}
                          errorMessage={cifError}
                          onChange={handleChange}
                          isRequired
                          placeholder="X99999999"
                          classNames={inputStyleConfig}
                        />
                        <SelectField
                          isDisabled={isSubmitting}
                          className="min-w-72 "
                          label="Forma legal"
                          name="legalForms"
                          dataField={legalForms}
                          dataEnum={legalFormEnum}
                          isRequired
                          classNames={selectStyleConfig}
                        />
                      </div>
                      <div className="flex w-full justify-around gap-4 flex-wrap md:flex-nowrap py-2">
                        <SelectField
                          isDisabled={isSubmitting}
                          className="min-w-72 "
                          label="Instalaciones veterinarias"
                          name="veterinaryFacilities"
                          dataField={veterinaryFacilities}
                          dataEnum={boolDataEnum}
                          isRequired
                          classNames={selectStyleConfig}
                        />
                        <SelectField
                          isDisabled={isSubmitting}
                          className="min-w-72 "
                          label="Veterinario propio"
                          name="ownVet"
                          dataField={ownVet}
                          dataEnum={boolDataEnum}
                          isRequired
                          classNames={selectStyleConfig}
                        />
                      </div>
                      <Accommodations
                        facilities={facilities}
                        isDisabled={isSubmitting}
                      />
                      <div className="flex w-full flex-col  gap-4">
                        <H3Title title="Descripción:" className="mx-2" />
                        <Textarea
                          isDisabled={isSubmitting}
                          className="w-full "
                          label="Descripción"
                          name="description"
                          isRequired
                          defaultValue={description}
                          placeholder="Describe tu protectora"
                          classNames={inputStyleConfig}
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
                  className="px-10 font-poppins font-medium text-sm"
                  onPress={onClose}
                >
                  Cancelar
                </Button>
                <Button
                  isDisabled={isFormValid}
                  color="primary"
                  variant="solid"
                  size="sm"
                  endContent={<IconSend2 />}
                  className="px-10 font-poppins font-medium text-sm"
                  type="submit"
                  name="intent"
                  value={'shelter-profile'}
                  isLoading={isSubmitting}
                >
                  Enviar
                </Button>
              </ModalFooter>
            </>
          </ModalContent>
        </Form>
      </Modal>
    </Button>
  );
};
export default ShelterForm;
