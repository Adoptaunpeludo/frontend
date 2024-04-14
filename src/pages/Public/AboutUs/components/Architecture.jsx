import {
  Modal,
  ModalContent,
  ModalHeader,
  ModalBody,
  ModalFooter,
  Button,
  useDisclosure,
  Image,
} from '@nextui-org/react';

const Architecture = () => {
  const { isOpen, onOpen, onOpenChange } = useDisclosure();

  return (
    <>
      <header className="text-center font-lobster text-5xl  text-secondary pb-10">
        La Arquitectura
      </header>
      <Button
        onPress={onOpen}
        className="w-[50%] h-[50%] max-w-screen-xl p-0 flex flex-col justify-center mx-auto mb-5"
      >
        <Image src="/architecture/architecture.png" />
      </Button>
      <Modal
        isOpen={isOpen}
        onOpenChange={onOpenChange}
        size="full"
        scrollBehavior="outside"
      >
        <ModalContent className="bg-stone-300">
          {(onClose) => (
            <>
              <ModalHeader className="flex flex-col gap-1">
                Arquitectura
              </ModalHeader>
              <ModalBody className="bg-stone-300">
                <Image src="/architecture/architecture.png" />
              </ModalBody>
              <ModalFooter className="bg-stone-300">
                <Button color="danger" variant="light" onPress={onClose}>
                  Close
                </Button>
              </ModalFooter>
            </>
          )}
        </ModalContent>
      </Modal>
    </>
  );
};

export default Architecture;
