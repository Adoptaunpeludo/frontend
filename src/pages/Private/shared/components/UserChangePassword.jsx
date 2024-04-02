import {
  Button,
  Input,
  Modal,
  ModalBody,
  ModalContent,
  ModalFooter,
  ModalHeader,
  Spinner,
  useDisclosure,
} from '@nextui-org/react';
import { IconCircleX, IconKey, IconSend2 } from '@tabler/icons-react';
// import { useQueryClient } from '@tanstack/react-query';
// import { useState } from 'react';
import { Form, useNavigation } from 'react-router-dom';
// import { toast } from 'react-toastify';

import { H3Title } from '../../../../components';
import {
  buttonStyleConfig,
  inputStyleConfig,
} from '../../../../utils/configFormFields';
import { useModalContext } from '../../../../context/ModalContext';
import { useEffect } from 'react';
// import { validateField } from '../../../../utils/validateField';
// import { updatePassword } from '../service/ChangePasswordService';

export const UserChangePassword = () => {
  const updatePasswordModal = useDisclosure();
  const { isOpen, onOpen, onOpenChange } = updatePasswordModal;
  const { saveUpdatePasswordModal } = useModalContext();
  const navigation = useNavigation();

  const isLoading = navigation.state === 'submitting';
  // const [isLoading, setIsLoading] = useState(false);
  // const [credentials, setCredentials] = useState({});
  // const [errors, setErrors] = useState({});
  // const handleChange = (event) => {
  //   const { name, value } = event.target;
  //   setCredentials({ ...credentials, [name]: value });
  //   setErrors({
  //     ...errors,
  //     [name]: validateField(name, value, credentials.password),
  //   });
  //   console.log({ errors }, ' mis credentials');
  // };
  // const isFormValid = Object.values(errors).every((error) => error === '');
  // const enableButton = !(
  //   credentials.password &&
  //   credentials.password === credentials.repeatPassword &&
  //   isFormValid
  // );

  // const queryClient = useQueryClient();

  // const handleSubmit = async (onClose) => {
  //   console.log({ onClose }, 'esto llega al cerrar');
  //   try {
  //     setIsLoading(true);
  //     await updatePassword(passwordPair);
  //     toast.success('Password cambiada con éxito');
  //     onClose();
  //   } catch (error) {
  //     toast.error('Error al cambiar password');
  //     console.log(error);
  //   } finally {
  //     setIsLoading(false);
  //   }
  // };

  useEffect(() => {
    saveUpdatePasswordModal(updatePasswordModal);
  }, []);

  return (
    <Button
      color="primary"
      size="md"
      startContent={<IconKey />}
      onPress={onOpen}
      className={buttonStyleConfig}
    >
      Cambiar password
      <Modal
        isOpen={isOpen}
        onOpenChange={onOpenChange}
        placement="center"
        className={`text-foreground bg-background border border-white`}
        size="lg"
      >
        <Form className="mt-4" method="post">
          <ModalContent>
            {(onClose) => (
              <>
                <ModalHeader className="flex flex-col ">
                  <H3Title
                    title="Cambia tu password"
                    className="border-b-1 border-primary normal-case"
                  />
                </ModalHeader>
                <ModalBody>
                  {isLoading ? (
                    <Spinner />
                  ) : (
                    <>
                      <Input
                        name="currentPassword"
                        className="min-w-72 "
                        classNames={inputStyleConfig}
                        type="password"
                        label="Password actual"
                        placeholder="Introduce tu password actual"
                        // color={errors.password ? 'danger' : 'none'}
                        // errorMessage={errors.password}
                        // onBlur={handleChange}
                        isRequired
                      />
                      <Input
                        name="newPassword"
                        className="min-w-72 "
                        classNames={inputStyleConfig}
                        type="password"
                        label="Nueva password"
                        placeholder="Introduce tu nueva password"
                        // color={errors.password ? 'danger' : 'none'}
                        // errorMessage={errors.password}
                        // onBlur={handleChange}
                        isRequired
                      />

                      <Input
                        name="repeatPassword"
                        className="min-w-72 "
                        classNames={inputStyleConfig}
                        type="password"
                        label="Confirmar password"
                        placeholder="Introduce tu password"
                        // color={errors.repeatPassword ? 'danger' : 'none'}
                        // errorMessage={errors.repeatPassword}
                        // onBlur={handleChange}
                        isRequired
                      />
                    </>
                  )}
                </ModalBody>
                <ModalFooter className="flex justify-center gap-4 w-full">
                  <Button
                    color="primary"
                    variant="solid"
                    size="sm"
                    startContent={<IconCircleX />}
                    className="px-10 font-poppins font-regular text-sm"
                    onPress={onClose}
                  >
                    Cancelar
                  </Button>
                  <Button
                    color="primary"
                    variant="solid"
                    size="sm"
                    endContent={<IconSend2 />}
                    className="px-10 font-poppins font-regular text-sm"
                    // isDisabled={enableButton}
                    type="submit"
                    name="intent"
                    value={'change-password'}
                  >
                    Enviar
                  </Button>
                </ModalFooter>
              </>
            )}
          </ModalContent>
        </Form>
      </Modal>
    </Button>
  );
};
