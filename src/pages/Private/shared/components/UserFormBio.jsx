import {
  Avatar,
  Button,
  Input,
  Modal,
  ModalBody,
  ModalContent,
  ModalFooter,
  ModalHeader,
  useDisclosure,
} from '@nextui-org/react';
import {
  IconCircleX,
  IconEdit,
  IconSend2,
  IconUserFilled,
} from '@tabler/icons-react';
import { H2Title, H3Title, Panel, SelectField } from '../../../../components';
import { cities } from '../../../../utils/enumData';

import { useEffect, useState } from 'react';
import { Form, useNavigation } from 'react-router-dom';
import { BUCKET_URL } from '../../../../config/config';
import { useModalContext } from '../../../../context/ModalContext';
import {
  inputStyleConfig,
  selectStyleConfig,
} from '../../../../utils/configFormFields';
import { validateField } from '../../../../utils/validateField';

export const UserFormBio = ({ data }) => {
  const updateBioModal = useDisclosure();
  const { isOpen, onOpen, onOpenChange, onClose } = updateBioModal;
  const { saveBioModal } = useModalContext();

  const [credentials, setCredentials] = useState({});
  const [errors, setErrors] = useState({});

  const handleChange = (event) => {
    const { name, value } = event.target;
    setCredentials({ ...credentials, [name]: value });
    setErrors({ ...errors, [name]: validateField(name, value) });
  };

  const handleClose = () => {
    setErrors({});
    onClose();
  };

  const isFormValid = Object.values(errors).every((error) => error === '');

  const disableButton = !isFormValid;

  const navigation = useNavigation();

  const isSubmitting = navigation.state === 'submitting';

  const { username, avatar, dni, firstName, lastName, phoneNumber, city } =
    data;

  useEffect(() => {
    saveBioModal(updateBioModal);
  }, []);

  return (
    <Button
      color="primary"
      size="md"
      startContent={<IconEdit />}
      onPress={onOpen}
      className={'max-w-[100px] my-4 font-poppins font-medium'}
    >
      Editar
      <Modal
        isOpen={isOpen}
        onOpenChange={onOpenChange}
        placement="center"
        scrollBehavior="outside"
        className={`text-foreground bg-background border border-white`}
        size="3xl"
        portalContainer={document.body}
      >
        <Form method="post" preventScrollReset={true}>
          <ModalContent>
            <>
              <ModalHeader className="flex flex-col gap-1">
                <H3Title
                  title="Actualiza tu perfil de usuario"
                  className="border-b-1 border-primary normal-case"
                />
              </ModalHeader>
              <ModalBody>
                <Panel className="max-w-4xl mx-auto">
                  <div className="flex flex-col gap-6 max-w-4xl mx-auto px-10 py-8">
                    <Avatar
                      className="w-40 h-40 bg-white self-center"
                      src={`${BUCKET_URL}/${avatar}`}
                      showFallback
                      fallback={<IconUserFilled className="size-20" />}
                      isBordered
                      color="primary"
                    />
                    <H2Title title={username} className="mx-auto" />
                    <div className="flex flex-col w-full gap-4">
                      <div className="flex w-full flex-wrap md:flex-nowrap gap-4">
                        <Input
                          isDisabled={isSubmitting}
                          className="min-w-72 "
                          type="text"
                          label="DNI"
                          name="dni"
                          defaultValue={dni ? dni : ''}
                          color={errors.dni ? 'danger' : 'none'}
                          errorMessage={errors.dni}
                          onBlur={handleChange}
                          placeholder={'Introduce tu DNI, 99999999X'}
                          isRequired
                          classNames={inputStyleConfig}
                        />
                      </div>
                      <div className="flex w-full flex-wrap md:flex-nowrap gap-4">
                        <Input
                          isDisabled={isSubmitting}
                          className="min-w-72 "
                          type="text"
                          label="Nombre"
                          name="firstName"
                          defaultValue={firstName ? firstName : ''}
                          placeholder="Introduce tu Nombre"
                          color={errors.firstName ? 'danger' : 'none'}
                          errorMessage={errors.firstName}
                          onBlur={handleChange}
                          isRequired
                          classNames={inputStyleConfig}
                        />
                        <Input
                          isDisabled={isSubmitting}
                          className="min-w-72 "
                          type="text"
                          label="Apellidos"
                          name="lastName"
                          defaultValue={lastName ? lastName : ''}
                          placeholder="Introduce tus apellidos"
                          color={errors.lastName ? 'danger' : 'none'}
                          errorMessage={errors.lastName}
                          onBlur={handleChange}
                          isRequired
                          classNames={inputStyleConfig}
                        />
                      </div>
                      <div className="flex w-full flex-wrap md:flex-nowrap gap-4">
                        <Input
                          isDisabled={isSubmitting}
                          className="min-w-72 "
                          type="tel"
                          label="Teléfono"
                          name="phoneNumber"
                          defaultValue={phoneNumber ? phoneNumber : ''}
                          color={errors.phoneNumber ? 'danger' : 'none'}
                          placeholder="Introduce tu número de teléfono"
                          onBlur={handleChange}
                          errorMessage={errors.phoneNumber}
                          isRequired
                          classNames={inputStyleConfig}
                        />
                        <SelectField
                          label="Ciudad"
                          className="min-w-72"
                          name="city"
                          dataField={city}
                          dataEnum={cities}
                          isDisabled={isSubmitting}
                          isRequired
                          classNames={selectStyleConfig}
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
                  onPress={() => handleClose()}
                >
                  Cancelar
                </Button>
                <Button
                  isDisabled={disableButton}
                  color="primary"
                  variant="solid"
                  size="sm"
                  endContent={<IconSend2 />}
                  className="px-10 font-poppins font-medium text-sm"
                  type="submit"
                  name="intent"
                  value={'user-profile'}
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
export default UserFormBio;
