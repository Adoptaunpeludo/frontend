import { useEffect, useState } from 'react';
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
import { useQueryClient } from '@tanstack/react-query';
import { Form } from 'react-router-dom';
import { toast } from 'react-toastify';

import { uploadAnimalFile } from '../../Shelters/AnimalForm/service';
import { uploadUserFile } from '../service/imagesService';
import { useImageValidation } from '../../../../hooks/useImageValidation';

const ImageUploadModal = ({ page, id, slug }) => {
  const { isOpen, onOpen, onOpenChange } = useDisclosure();
  const queryClient = useQueryClient();

  const [isLoading, setIsLoading] = useState(false);
  const {
    fileError,
    setFileError,
    selectedFile,
    setSelectedFile,
    validateImage,
  } = useImageValidation();

  useEffect(() => {
    setSelectedFile(null);
    setFileError('');
  }, [onOpenChange]);

  const maxSizeInBytes = 2 * 1024 * 1024; // 2 MB
  const handleFileChange = (event) => {
    const file = event.target.files.item(0);
    validateImage(file, maxSizeInBytes);
  };

  const handleUploadFile = async (onClose) => {
    if (!selectedFile || fileError) return;

    const service =
      page === 'update-animal'
        ? () => uploadAnimalFile(selectedFile, id)
        : () => uploadUserFile(selectedFile);

    const queryKey =
      page === 'update-animal' ? ['animal-details', slug] : ['user'];

    try {
      setIsLoading(true);
      await service();
      toast.success('Imagen subida con éxito');
      queryClient.invalidateQueries({
        queryKey,
      });
      onClose();
    } catch (error) {
      toast.error('Error al subir el archivo');
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
                <ModalHeader className="flex flex-col  ">
                  <span className="border-b-1 border-primary mb-5 pb-1">
                    Cargar Imagen
                  </span>
                </ModalHeader>
                <ModalBody>
                  {isLoading ? (
                    <Spinner />
                  ) : (
                    <>
                      <input
                        className="relative m-0 block w-full min-w-0 flex-auto rounded border border-solid border-primary bg-clip-padding px-3 py-[0.32rem] text-base font-normal text-neutral-700 transition duration-300 ease-in-out file:-mx-3 file:-my-[0.32rem] file:overflow-hidden file:rounded-none file:border-0 file:border-solid file:border-inherit file:bg-neutral-100 file:px-3 file:py-[0.32rem] file:text-neutral-700 file:transition file:duration-150 file:ease-in-out file:[border-inline-end-width:1px] file:[margin-inline-end:0.75rem] hover:file:bg-neutral-200 focus:border-primary focus:text-neutral-700 focus:shadow-te-primary focus:outline-none dark:border-primary dark:text-neutral-200 dark:file:bg-neutral-700 dark:file:text-neutral-100 dark:focus:border-primary"
                        id="file_input"
                        type="file"
                        style={
                          fileError ? { color: 'red' } : { color: 'black' }
                        }
                        onChange={handleFileChange}
                      />
                      <p style={{ color: 'red', fontSize: '16px' }}>
                        {fileError}
                      </p>
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
                    className="bg-primary text-foreground font-poppins font-medium"
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
