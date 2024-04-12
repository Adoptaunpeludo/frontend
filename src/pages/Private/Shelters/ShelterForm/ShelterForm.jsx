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
import { isMatchFormData } from '../../../../utils/isMatchFormData';

const ShelterForm = ({ isSubmitting, data }) => {
  const updateShelterModal = useDisclosure();
  const { isOpen, onOpen, onOpenChange, onClose } = updateShelterModal;
  const { saveShelterModal } = useModalContext();

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

  const [formData, setFormData] = useState({
    cif,
    legalForms,
    ownVet,
    description,
    veterinaryFacilities,
    facilities,
  });

  const [errors, setErrors] = useState('');
  const [noChanges, setNoChanges] = useState(true);

  const navigation = useNavigation();

  isSubmitting = navigation.state === 'submitting';

  const handleChange = (event) => {
    const { name, value, type, checked } = event.target;
    if (type === 'checkbox') {
      const updatedFacilities = [...formData.facilities];
      if (checked) {
        updatedFacilities.push(value);
      } else {
        const index = updatedFacilities.indexOf(value);
        if (index !== -1) {
          updatedFacilities.splice(index, 1);
        }
      }
      setFormData({ ...formData, facilities: updatedFacilities });
    } else {
      setFormData({ ...formData, [name]: value });
      setErrors({ ...errors, [name]: validateField(name, value) });
    }
  };

  useEffect(() => {
    if (isMatchFormData(data, formData)) {
      setNoChanges(true);
    } else {
      setNoChanges(false);
    }
  }, [formData]);

  useEffect(() => {
    setErrors('');
  }, [isOpen]);

  const isFormValid =
    Object.values(errors).every((error) => error === '') && !noChanges;

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
                          isRequired
                          className="min-w-72 "
                          type="text"
                          label="CIF"
                          name="cif"
                          defaultValue={cif === '' ? '' : cif}
                          isDisabled={isSubmitting}
                          color={errors.cif ? 'danger' : 'none'}
                          errorMessage={errors.cif}
                          onChange={handleChange}
                          placeholder="X99999999"
                          classNames={inputStyleConfig}
                        />
                        <SelectField
                          isRequired
                          isDisabled={isSubmitting}
                          className="min-w-72 "
                          label="Forma legal"
                          name="legalForms"
                          color={errors.legalForms ? 'danger' : 'none'}
                          errorMessage={errors.legalForms}
                          onChange={handleChange}
                          dataField={legalForms}
                          dataEnum={legalFormEnum}
                          classNames={selectStyleConfig}
                        />
                      </div>
                      <div className="flex w-full justify-around gap-4 flex-wrap md:flex-nowrap py-2">
                        <SelectField
                          isRequired
                          isDisabled={isSubmitting}
                          className="min-w-72 "
                          label="Instalaciones veterinarias"
                          name="veterinaryFacilities"
                          color={
                            errors.veterinaryFacilities ? 'danger' : 'none'
                          }
                          errorMessage={errors.veterinaryFacilities}
                          onChange={handleChange}
                          dataField={veterinaryFacilities}
                          dataEnum={boolDataEnum}
                          classNames={selectStyleConfig}
                        />
                        <SelectField
                          isRequired
                          isDisabled={isSubmitting}
                          className="min-w-72 "
                          label="Veterinario propio"
                          name="ownVet"
                          color={errors.ownVet ? 'danger' : 'none'}
                          errorMessage={errors.ownVet}
                          onChange={handleChange}
                          dataField={ownVet}
                          dataEnum={boolDataEnum}
                          classNames={selectStyleConfig}
                        />
                      </div>
                      <Accommodations
                        facilities={facilities}
                        isDisabled={isSubmitting}
                        handleChange={handleChange}
                      />
                      <div className="flex w-full flex-col  gap-4">
                        <H3Title title="Descripción:" className="mx-2" />
                        <Textarea
                          isRequired
                          isDisabled={isSubmitting}
                          className="w-full "
                          label="Descripción"
                          name="description"
                          color={errors.description ? 'danger' : 'none'}
                          errorMessage={errors.description}
                          onChange={handleChange}
                          defaultValue={description}
                          placeholder="Describe tu protectora"
                          classNames={inputStyleConfig}
                        />
                      </div>
                      <p style={{ color: 'red', textAlign: 'right' }}>
                        {noChanges && 'No hay cambios en el formulario'}
                      </p>
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
                  isDisabled={!isFormValid}
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
