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
import { toast } from 'react-toastify';
import { deleteUser } from '../service/userService';
import { IconTrashXFilled } from '@tabler/icons-react';
import { useNavigate } from 'react-router-dom';

export default function DeleteUserModal() {
  const { isOpen, onOpen, onOpenChange } = useDisclosure();
  const [isLoading, setIsLoading] = useState(false);
  const queryClient = useQueryClient();
  const navigate = useNavigate();

  const handleDeleteUser = async () => {
    try {
      setIsLoading(true);
      await deleteUser();
      toast.success('Usuario Borrada con exito');
      queryClient.removeQueries({
        queryKey: ['user'],
      });
      navigate('/');
    } catch (error) {
      toast.error('Error al borrar el usuario');
      console.log(error);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <>
      <Button
        onPress={onOpen}
        color="danger"
        size="lg"
        startContent={<IconTrashXFilled />}
      >
        Borrar Usuario
      </Button>
      <Modal
        isOpen={isOpen}
        onOpenChange={onOpenChange}
        placement="center"
        className={` text-foreground bg-danger border border-white text-white`}
      >
        <ModalContent>
          {(onClose) => (
            <>
              <ModalHeader className="flex flex-col gap-1">
                Borrar Usuario
              </ModalHeader>
              <ModalBody>
                {isLoading ? (
                  <Spinner />
                ) : (
                  <>
                    <p>¿Seguro que deseas borrar el usuario?</p>
                    <small>Esta acción no se puede deshacer</small>
                  </>
                )}
              </ModalBody>
              <ModalFooter>
                <Button
                  className="text-white"
                  variant="light"
                  onPress={onClose}
                  disabled={isLoading}
                >
                  Close
                </Button>
                <Button
                  className=" text-white"
                  color="danger"
                  onPress={handleDeleteUser}
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
