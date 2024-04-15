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

import { Form, useNavigation } from 'react-router-dom';

import { useEffect } from 'react';
import { H3Title } from '../../../../components';
import { useModalContext } from '../../../../context/ModalContext';
import {
  buttonStyleConfig,
  inputStyleConfig,
} from '../../../../utils/configFormFields';
import { useValidateFormFields } from '../../../../hooks/useValidateFormFields';

export const UserChangePassword = ({ isDisabled }) => {
  const updatePasswordModal = useDisclosure();
  const { isOpen, onOpen, onOpenChange } = updatePasswordModal;
  const { saveUpdatePasswordModal } = useModalContext();
  const navigation = useNavigation();

  const isLoading = navigation.state === 'submitting';

  const initialValues = {
    oldPassword: '',
    newPassword: '',
    repeatPassword: '',
  };

  const { credentials, errors, handleChange, isFormValid } =
    useValidateFormFields(initialValues, isOpen);

  const enableButton = !(
    credentials.newPassword &&
    credentials.newPassword === credentials.repeatPassword &&
    isFormValid
  );

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
      isDisabled={isDisabled}
    >
      Cambiar password
      <Modal
        isOpen={isOpen}
        onOpenChange={onOpenChange}
        placement="center"
        className={`text-foreground bg-background border border-white`}
        size="lg"
      >
        <Form
          className="mt-4"
          method="post"
          onKeyDown={(event) => {
            if (event.key === 'Enter') event.preventDefault();
          }}
        >
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
                        name="oldPassword"
                        className="min-w-72 "
                        classNames={inputStyleConfig}
                        type="password"
                        label="Password actual"
                        placeholder="Introduce tu password actual"
                        color={errors.oldPassword ? 'danger' : 'none'}
                        errorMessage={errors.oldPassword}
                        onChange={handleChange}
                        isRequired
                        value={credentials.oldPassword || ''}
                      />
                      <Input
                        name="newPassword"
                        className="min-w-72 "
                        classNames={inputStyleConfig}
                        type="password"
                        label="Nueva password"
                        placeholder="Introduce tu nueva password"
                        color={errors.newPassword ? 'danger' : 'none'}
                        errorMessage={errors.newPassword}
                        onChange={handleChange}
                        value={credentials.newPassword || ''}
                        isRequired
                      />

                      <Input
                        name="repeatPassword"
                        className="min-w-72 "
                        classNames={inputStyleConfig}
                        type="password"
                        label="Confirmar password"
                        placeholder="Introduce tu password"
                        color={errors.repeatPassword ? 'danger' : 'none'}
                        errorMessage={errors.repeatPassword}
                        onChange={handleChange}
                        value={credentials.repeatPassword || ''}
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
                    isDisabled={enableButton}
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
