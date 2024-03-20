import {
  Modal,
  ModalContent,
  ModalHeader,
  ModalBody,
  ModalFooter,
  Button,
  useDisclosure,
  Spinner,
  Tooltip,
} from '@nextui-org/react';
import { IconTrashXFilled } from '@tabler/icons-react';
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
                    Borrar Anuncio de Adopción
                  </ModalHeader>
                  <ModalBody>
                    {isSubmitting ? (
                      <Spinner />
                    ) : (
                      <>
                        <p>¿Seguro que deseas borrar el anuncio de adopción?</p>
                        <small>Esta acción no se puede deshacer</small>
                      </>
                    )}
                  </ModalBody>
                  <ModalFooter>
                    <Button
                      color="default"
                      variant="light"
                      onPress={onClose}
                      disabled={isSubmitting}
                    >
                      Close
                    </Button>
                    <Button
                      className=" text-white"
                      color="danger"
                      name="intent"
                      value={'delete-animal'}
                      disabled={isSubmitting}
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
