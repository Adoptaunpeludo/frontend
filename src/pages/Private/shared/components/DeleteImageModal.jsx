import { useState } from 'react';
import {
  Button,
  Modal,
  ModalBody,
  ModalContent,
  ModalFooter,
  ModalHeader,
  Spinner,
  useDisclosure,
} from '@nextui-org/react';
import { IconTrashXFilled } from '@tabler/icons-react';
import { useQueryClient } from '@tanstack/react-query';
import { toast } from 'react-toastify';

import { deleteAnimalFile } from '../../Shelters/AnimalForm/service';
import { deleteUserFile } from '../service/imagesService';

export default function DeleteImageModal({ name, page, slug, id }) {
  const { isOpen, onOpen, onOpenChange } = useDisclosure();
  const [isLoading, setIsLoading] = useState(false);
  const queryClient = useQueryClient();

  const handleDeleteImage = async (name, onClose) => {
    const images = [name];

    const service =
      page === 'update-animal'
        ? () => deleteAnimalFile(images, id)
        : () => deleteUserFile(images);

    const queryKey =
      page === 'update-animal' ? ['animal-details', slug] : ['user'];

    try {
      setIsLoading(true);
      await service();
      toast.success('Imagen Borrada con exito');
      queryClient.invalidateQueries({
        queryKey,
      });
      onClose();
    } catch (error) {
      toast.error('Error al borrar la imagen');
      console.log(error);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <>
      <Button
        onPress={onOpen}
        className="absolute top-[-10px] right-[-10px] z-10 rounded-full  "
        color="danger"
        size="sm"
        isIconOnly
      >
        <IconTrashXFilled />
        {/* <i className="fa-solid fa-xmark text-xl text-white " /> */}
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
                <span className="border-b-1 border-primary mb-5 pb-1">
                  Borrar Imagen
                </span>
              </ModalHeader>
              <ModalBody>
                {isLoading ? (
                  <Spinner />
                ) : (
                  <>
                    <p className="text-center font-poppins font-semibold text-lg">
                      ¿Seguro que deseas borrar la imagen?
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
                  disabled={isLoading}
                  className="border-1 border-primary text-foreground font-poppins font-medium"
                >
                  Cerrar
                </Button>
                <Button
                  color="danger"
                  onPress={() => handleDeleteImage(name, onClose)}
                  disabled={isLoading}
                  className=" text-white font-poppins font-medium"
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
