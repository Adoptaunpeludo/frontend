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
  // useDisclosure,
} from '@nextui-org/react';
import { IconCircleX, IconEdit, IconSend2 } from '@tabler/icons-react';
import { cities } from '../../../../utils/enumData';
import { H2Title, Panel, SelectField } from '../../../../components';

import { Form, useNavigation } from 'react-router-dom';
import { BUCKET_URL } from '../../../../config/config';

export const UserFormBio = ({ data }) => {
  const { isOpen, onOpen, onClose, onOpenChange } = useDisclosure();

  const navigation = useNavigation();

  const isSubmitting = navigation.state === 'submitting';

  const { username, avatar, dni, firstName, lastName, phoneNumber, city } =
    data;

  return (
    <Button
      color="primary"
      size="md"
      startContent={<IconEdit />}
      onPress={onOpen}
      className="max-w-[100px] my-4"
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
                {/* <Hero /> */}
                Actualizar Perfil de Usuario
              </ModalHeader>
              <ModalBody>
                <Panel className="max-w-4xl mx-auto">
                  <div className="flex flex-col gap-6 max-w-4xl mx-auto px-10 py-8">
                    <Avatar
                      className="w-40 h-40 bg-white self-center"
                      src={`${BUCKET_URL}/${avatar}`}
                    />
                    <H2Title title={username} className="mx-auto" />
                    <div className="flex flex-col w-full gap-4">
                      {/* TODO: useInput hook to custom all inputs with the same styles  */}
                      <div className="flex w-full flex-wrap md:flex-nowrap gap-4">
                        <Input
                          className="min-w-72 "
                          type="text"
                          label="DNI"
                          name="dni"
                          defaultValue={dni === '' ? 'Introduce tu email' : dni}
                        />
                      </div>
                      <div className="flex w-full flex-wrap md:flex-nowrap gap-4">
                        <Input
                          className="min-w-72 "
                          type="text"
                          label="Nombre"
                          name="firstName"
                          defaultValue={
                            firstName === '' ? 'Introduce tu nombre' : firstName
                          }
                        />
                        <Input
                          className="min-w-72 "
                          type="text"
                          label="Apellidos"
                          name="lastName"
                          defaultValue={
                            lastName === ''
                              ? 'Introduce tus apellidos'
                              : lastName
                          }
                        />
                      </div>
                      <div className="flex w-full flex-wrap md:flex-nowrap gap-4">
                        <Input
                          className="min-w-72 "
                          type="tel"
                          label="Teléfono"
                          name="phoneNumber"
                          defaultValue={
                            phoneNumber === ''
                              ? 'Introduce tu teléfono'
                              : phoneNumber
                          }
                        />
                        <SelectField
                          label="Ciudad"
                          className="min-w-72"
                          name="city"
                          dataField={city}
                          dataEnum={cities}
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
                  type="submit"
                  name="intent"
                  value={'shelter-user-profile'}
                  isLoading={isSubmitting}
                  onPress={onClose}
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
