import {
  Button,
  Image,
  Modal,
  ModalBody,
  ModalContent,
  ModalFooter,
  ModalHeader,
  useDisclosure,
} from '@nextui-org/react';
import { IconArrowRight } from '@tabler/icons-react';

import { H2Title } from '../../../../components';

export const ModalTechnologies = ({ technology = '' }) => {
  const { isOpen, onOpen, onOpenChange } = useDisclosure();
  return (
    <>
      <Button onPress={onOpen} variant="light">
        <span className="text-tertiary font-poppins font-bold">Leer más</span>

        <IconArrowRight stroke={1} className="stroke-tertiary" />
      </Button>
      <Modal
        isOpen={isOpen}
        onOpenChange={onOpenChange}
        scrollBehavior="inside"
        className="max-h-96 overflow-y-auto"
      >
        <ModalContent>
          {(onClose) => (
            <>
              <ModalHeader className="flex flex-col gap-1 border-b-1 border-primary mb-2 pb-1">
                <div className="flex items-center gap-3 ">
                  <Image
                    src={technology.img}
                    width={'50px'}
                    alt={technology.title}
                  />

                  <H2Title title={technology.title} />
                </div>
              </ModalHeader>
              <ModalBody className="">
                <section
                  dangerouslySetInnerHTML={{
                    __html: technology.description,
                  }}
                />
              </ModalBody>
              <ModalFooter>
                <Button color="primary" variant="solid" onPress={onClose}>
                  Cerrar
                </Button>
              </ModalFooter>
            </>
          )}
        </ModalContent>
      </Modal>
    </>
  );
};
export default ModalTechnologies;
