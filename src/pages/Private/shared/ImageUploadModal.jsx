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
import { useState } from 'react';
import { Form } from 'react-router-dom';
import { uploadFile } from './imagesService';
import { toast } from 'react-toastify';
import { useQueryClient } from '@tanstack/react-query';

const ImageUploadModal = () => {
  const { isOpen, onOpen, onOpenChange } = useDisclosure();
  const queryClient = useQueryClient();
  const [selectedFile, setSelectedFile] = useState();
  const [isLoading, setIsLoading] = useState(false);

  const handleUploadFile = async (onClose) => {
    if (!selectedFile) return;

    try {
      setIsLoading(true);
      await uploadFile(selectedFile);
      toast.success('Imagen subida con exito');
      queryClient.invalidateQueries({
        queryKey: ['user'],
      });
      onClose();
    } catch (error) {
      toast.error('Error al subir el archivo');
      console.log(error);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <Form className="z-50 flex h-full w-full items-center">
      <Button
        onPress={onOpen}
        className="flex justify-center items-center rounded-md p-2 transition-colors h-full w-full border-stone-300 border-medium bg-background text-foreground"
      >
        <i className="fa-solid fa-plus text-xl text-stone-300"></i>
        <Modal
          isOpen={isOpen}
          onOpenChange={onOpenChange}
          placement="center"
          className={`text-foreground bg-background border border-white`}
        >
          <ModalContent>
            {(onClose) => (
              <>
                <ModalHeader className="flex flex-col gap-1">
                  Cargar Imagen
                </ModalHeader>
                <ModalBody>
                  {isLoading ? (
                    <Spinner />
                  ) : (
                    <>
                      <input
                        className="relative m-0 block w-full min-w-0 flex-auto rounded border border-solid border-neutral-300 bg-clip-padding px-3 py-[0.32rem] text-base font-normal text-neutral-700 transition duration-300 ease-in-out file:-mx-3 file:-my-[0.32rem] file:overflow-hidden file:rounded-none file:border-0 file:border-solid file:border-inherit file:bg-neutral-100 file:px-3 file:py-[0.32rem] file:text-neutral-700 file:transition file:duration-150 file:ease-in-out file:[border-inline-end-width:1px] file:[margin-inline-end:0.75rem] hover:file:bg-neutral-200 focus:border-primary focus:text-neutral-700 focus:shadow-te-primary focus:outline-none dark:border-neutral-600 dark:text-neutral-200 dark:file:bg-neutral-700 dark:file:text-neutral-100 dark:focus:border-primary"
                        id="file_input"
                        type="file"
                        onChange={(e) => {
                          return setSelectedFile(e.target.files.item(0));
                        }}
                      />
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
                    Cerrar
                  </Button>
                  <Button
                    className="bg-tertiary text-white"
                    onPress={() => handleUploadFile(onClose)}
                    disabled={isLoading}
                  >
                    Subir
                  </Button>
                </ModalFooter>
              </>
            )}
          </ModalContent>
        </Modal>
      </Button>
    </Form>
  );
};

export default ImageUploadModal;
