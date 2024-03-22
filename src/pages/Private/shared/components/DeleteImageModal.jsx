import {
  Modal,
  ModalContent,
  ModalHeader,
  ModalBody,
  ModalFooter,
  Button,
  useDisclosure,
  Spinner,
} from '@nextui-org/react';
import { useQueryClient } from '@tanstack/react-query';
import { useState } from 'react';
import { deleteUserFile } from '../service/imagesService';
import { toast } from 'react-toastify';
import { deleteAnimalFile } from '../../Shelters/AnimalForm/service';

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
                {isLoading ? (
                  <Spinner />
                ) : (
                  <>
                    <p>¿Seguro que deseas borrar la imagen?</p>
                    <small>Esta acción no se puede deshacer</small>
                  </>
                )}
              </ModalBody>
              <ModalFooter>
                <Button
                  color="default"
                  variant="light"
                  onPress={onClose}
                  disabled={isLoading}
                >
                  Close
                </Button>
                <Button
                  className=" text-white"
                  color="danger"
                  onPress={() => handleDeleteImage(name, onClose)}
                  disabled={isLoading}
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
