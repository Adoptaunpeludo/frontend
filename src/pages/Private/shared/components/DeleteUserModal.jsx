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
import { IconAlertTriangle, IconTrashXFilled } from '@tabler/icons-react';
import { useQueryClient } from '@tanstack/react-query';
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import { deleteUser } from '../service/userService';
import { logout } from '../../../Auth/authService';
import { deleteChatHistory } from '../../Assistant/service';

export default function DeleteUserModal() {
  const { isOpen, onOpen, onOpenChange } = useDisclosure();
  const [isLoading, setIsLoading] = useState(false);
  const queryClient = useQueryClient();
  const navigate = useNavigate();

  const handleDeleteUser = async () => {
    localStorage.setItem('isLoggedIn', false);
    try {
      setIsLoading(true);
      await Promise.all([logout(), deleteChatHistory(), deleteUser()]);

      toast.success('Usuario Borrado con exito');
      queryClient.removeQueries({
        queryKey: ['user'],
      });
      queryClient.removeQueries({
        queryKey: ['user-notifications'],
      });
      queryClient.removeQueries({
        queryKey: ['user-favs'],
      });
      queryClient.removeQueries({
        queryKey: ['user-animals'],
      });
      queryClient.removeQueries({
        queryKey: ['user-chats'],
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
        className={` text-foreground border border-white `}
      >
        <ModalContent>
          {(onClose) => (
            <>
              <ModalHeader className="flex flex-col gap-1">
                <span className="border-b-1 border-primary mb-5 pb-1">
                  Borrar Usuario
                </span>
              </ModalHeader>
              <ModalBody>
                {isLoading ? (
                  <Spinner />
                ) : (
                  <>
                    <IconAlertTriangle className="size-20 mx-auto stroke-danger" />
                    <p className="text-center font-poppins font-semibold text-lg">
                      ¿Seguro que deseas borrar el usuario?
                    </p>
                    <small className="text-center font-poppins font-medium ">
                      Esta acción no se puede deshacer
                    </small>
                  </>
                )}
              </ModalBody>
              <ModalFooter>
                <Button
                  variant="light"
                  onPress={onClose}
                  disabled={isLoading}
                  className="border-1 border-primary text-foreground font-poppins font-medium"
                >
                  Cerrar
                </Button>
                <Button
                  color="danger"
                  onPress={handleDeleteUser}
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
