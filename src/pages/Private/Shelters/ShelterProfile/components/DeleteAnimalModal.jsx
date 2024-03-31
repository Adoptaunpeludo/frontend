import {
  Button,
  Modal,
  ModalBody,
  ModalContent,
  ModalFooter,
  ModalHeader,
  Spinner,
  Tooltip,
  useDisclosure,
} from '@nextui-org/react';
import { IconAlertTriangle, IconTrashXFilled } from '@tabler/icons-react';
import { Form, useNavigation } from 'react-router-dom';

export default function DeleteAnimalModal({ slug }) {
  const { isOpen, onOpen, onOpenChange } = useDisclosure();
  const navigation = useNavigation();

  const isSubmitting = navigation.state === 'submitting';

  return (
    <Tooltip color="danger" content="Eliminar Peludo">
      <Button onPress={onOpen} color="danger" size="sm" isIconOnly>
        <IconTrashXFilled />
        <Modal
          isOpen={isOpen}
          onOpenChange={onOpenChange}
          placement="center"
          className={` text-foreground bg-background border border-white`}
        >
          <Form method="post" preventScrollReset={true}>
            <ModalContent>
              {(onClose) => (
                <>
                  <ModalHeader className="flex flex-col gap-1">
                    <span className="border-b-1 border-primary mb-5 pb-1">
                      Borrar Anuncio de Adopción
                    </span>
                  </ModalHeader>
                  <ModalBody>
                    {isSubmitting ? (
                      <Spinner />
                    ) : (
                      <>
                        <IconAlertTriangle className="size-20 mx-auto stroke-danger" />
                        <p className="text-center font-poppins font-semibold text-lg text-pretty">
                          ¿Seguro que deseas borrar el anuncio de adopción?
                        </p>
                        <small className="text-center font-poppins font-medium ">
                          Esta acción no se puede deshacer
                        </small>
                      </>
                    )}
                  </ModalBody>
                  <ModalFooter>
                    <Button
                      color="default"
                      variant="light"
                      onPress={onClose}
                      disabled={isSubmitting}
                      className="border-1 border-primary text-foreground font-poppins font-medium"
                    >
                      Cerrar
                    </Button>
                    <Button
                      className=" text-white font-poppins font-medium"
                      color="danger"
                      name="intent"
                      value={'delete-animal'}
                      isLoading={isSubmitting}
                      type="submit"
                    >
                      Borrar
                    </Button>
                  </ModalFooter>
                </>
              )}
            </ModalContent>
            <input type="hidden" name="slug" value={slug}></input>
          </Form>
        </Modal>
      </Button>
    </Tooltip>
  );
}
