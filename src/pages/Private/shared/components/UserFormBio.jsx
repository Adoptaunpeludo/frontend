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
import { isMatchFormData } from '../../../../utils/isMatchFormData';
// import { updateData } from '../../../../api/client';
// import { toast } from 'react-toastify';

export const UserFormBio = ({ data }) => {
  const updateBioModal = useDisclosure();
  const { isOpen, onOpen, onOpenChange, onClose } = updateBioModal;
  const { saveBioModal } = useModalContext();

  const { username, avatar, dni, firstName, lastName, phoneNumber, city } =
    data;

  const [credentials, setCredentials] = useState({
    username,
    dni,
    firstName,
    lastName,
    phoneNumber,
    city,
  });

  const [errors, setErrors] = useState({});
  const [noChanges, setNoChanges] = useState(true);

  const handleChange = (event) => {
    const { name, value } = event.target;
    setCredentials({ ...credentials, [name]: value });
    setErrors({ ...errors, [name]: validateField(name, value) });
  };

  useEffect(() => {
    if (isMatchFormData(data, credentials)) {
      setNoChanges(true);
    } else {
      setNoChanges(false);
    }
  }, [credentials]);

  useEffect(() => {
    setErrors({});
  }, [isOpen]);

  const isFormValid =
    Object.values(errors).every((error) => error === '') && !noChanges;

  const navigation = useNavigation();

  const isSubmitting = navigation.state === 'submitting';

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
        <Form method="post" preventScrollReset={true} onKeyDown={() => {}}>
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
                          isRequired
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
                          classNames={inputStyleConfig}
                        />
                        <Input
                          isRequired
                          isDisabled={true}
                          className="min-w-72 "
                          type="text"
                          label="Nombre de usuario"
                          name="username"
                          defaultValue={username ? username : ''}
                          color={errors.username ? 'danger' : 'none'}
                          errorMessage={errors.username}
                          onBlur={handleChange}
                          placeholder={'Introduce tu nombre de usuario'}
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
                          onChange={handleChange}
                          classNames={inputStyleConfig}
                        />
                        <SelectField
                          isRequired
                          label="Ciudad"
                          className="min-w-72"
                          name="city"
                          dataField={city}
                          dataEnum={cities}
                          color={errors.city ? 'danger' : 'none'}
                          errorMessage={errors.city}
                          isDisabled={isSubmitting}
                          onChange={handleChange}
                          classNames={selectStyleConfig}
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
                  className="px-10 font-poppins font-semibold text-sm"
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
