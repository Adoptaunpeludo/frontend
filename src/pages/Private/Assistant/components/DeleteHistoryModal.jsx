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
import { useNavigation, useParams } from 'react-router-dom';
import { toast } from 'react-toastify';
import { deleteData } from '../../../../api/client';
import TrashCan from './TrashCan';
import { ASSISTANT_SERVER } from '../../../../config/config';

export default function DeleteModal({ deleteMessages }) {
  const { isOpen, onOpen, onOpenChange } = useDisclosure();
  const params = useParams();
  const { username } = params;
  const navigation = useNavigation();

  const isLoading = navigation.state === 'loading';

  const queryClient = useQueryClient();

  const handleDeleteHistory = async (onClose) => {
    const url = `${ASSISTANT_SERVER}/chat-history`;

    try {
      const { data } = await deleteData(url);

      queryClient.invalidateQueries({
        queryKey: ['chat-history', username],
      });
      deleteMessages();
      toast.success(data.message);
      onClose();
    } catch (error) {
      if (error instanceof Error) return toast.error(error.message);
      if (typeof error === 'string') return toast.error(error);
      return toast.error('Error desconocido, revise los logs');
    }
  };

  return (
    <>
      <Button
        onPress={onOpen}
        isIconOnly
        aria-label="Like"
        className="bg-terciary"
        color="danger"
      >
        <TrashCan />
      </Button>
      <Modal
        isOpen={isOpen}
        onOpenChange={onOpenChange}
        className={`text-foreground bg-background border border-white`}
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
                  <ModalBody>
                    <p>¿Seguro que deseas borrar el historial del chat?</p>
                    <small>Esta acción no puede ser deshecha</small>
                  </ModalBody>
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
