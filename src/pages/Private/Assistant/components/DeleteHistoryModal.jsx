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
import { useNavigation } from 'react-router-dom';
import { toast } from 'react-toastify';
import TrashCan from './TrashCan';
import { deleteChatHistory } from '../service';
import { useUser } from '../../useUser';
import { useState } from 'react';

export default function DeleteModal({ deleteMessages }) {
  const { isOpen, onOpen, onOpenChange } = useDisclosure();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const { data: user } = useUser();
  const navigation = useNavigation();

  const isLoading = navigation.state === 'loading';

  const queryClient = useQueryClient();

  const handleDeleteHistory = async (onClose) => {
    try {
      setIsSubmitting(true);
      const data = await deleteChatHistory(user?.wsToken);
      queryClient.invalidateQueries({
        queryKey: ['chat-history', user?.username],
      });
      deleteMessages();
      toast.success(data.message);
      onClose();
      setIsSubmitting(false);
    } catch (error) {
      if (error instanceof Error) return toast.error(error.message);
      if (typeof error === 'string') return toast.error(error);
      setIsSubmitting(false);
      return toast.error('Error desconocido, revise los logs');
    }
  };

  return (
    <>
      <Button
        onPress={onOpen}
        isIconOnly
        aria-label="trash"
        className="bg-terciary"
        color="danger"
      >
        <TrashCan />
      </Button>
      <Modal
        isOpen={isOpen}
        onOpenChange={onOpenChange}
        className={`text-foreground bg-background border border-white`}
        placement="center"
      >
        <ModalContent>
          {(onClose) => (
            <>
              {isLoading ? (
                <Spinner />
              ) : (
                <>
                  <ModalHeader className="flex flex-col gap-1">
                    Borrar Historial
                  </ModalHeader>
                  {isSubmitting ? (
                    <Spinner />
                  ) : (
                    <ModalBody>
                      <p>¿Seguro que deseas borrar el historial del chat?</p>
                      <small>Esta acción no puede ser deshecha</small>
                    </ModalBody>
                  )}

                  <ModalFooter>
                    <Button color="default" variant="light" onPress={onClose}>
                      Close
                    </Button>
                    <Button
                      className="bg-tertiary text-white"
                      onPress={() => handleDeleteHistory(onClose)}
                    >
                      Borrar
                    </Button>
                  </ModalFooter>
                </>
              )}
            </>
          )}
        </ModalContent>
      </Modal>
    </>
  );
}
