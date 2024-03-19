import {
  Modal,
  ModalContent,
  ModalHeader,
  ModalBody,
  ModalFooter,
  Button,
  useDisclosure,
} from '@nextui-org/react';

export default function DeleteImageModal({ name, onSetImages }) {
  const { isOpen, onOpen, onOpenChange } = useDisclosure();

  const handleDeleteImage = (onClose) => {
    onSetImages((images) => images.filter((image) => image.name !== name));
    onClose();
  };

  return (
    <>
      <Button
        onPress={onOpen}
        className="absolute top-[-15px] right-[-15px] z-10 rounded-full"
        color="danger"
        size="sm"
        isIconOnly
      >
        <i className="fa-solid fa-xmark text-xl text-white "></i>
      </Button>
      <Modal
        isOpen={isOpen}
        onOpenChange={onOpenChange}
        placement="center"
        className={` text-foreground bg-background border border-white`}
      >
        <ModalContent>
          {(onClose) => (
            <>
              <ModalHeader className="flex flex-col gap-1">
                Borrar Imagen
              </ModalHeader>
              <ModalBody>
                <>
                  <p>¿Seguro que deseas borrar la imagen?</p>
                  <small>Esta acción no se puede deshacer</small>
                </>
              </ModalBody>
              <ModalFooter>
                <Button color="default" variant="light" onPress={onClose}>
                  Close
                </Button>
                <Button
                  className=" text-white"
                  color="danger"
                  onPress={() => handleDeleteImage(onClose)}
                >
                  Borrar
                </Button>
              </ModalFooter>
            </>
          )}
        </ModalContent>
      </Modal>
    </>
  );
}
