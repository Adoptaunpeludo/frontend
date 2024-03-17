import {
  Button,
  Input,
  Modal,
  ModalBody,
  ModalContent,
  ModalFooter,
  ModalHeader,
  Spinner,
  Table,
  TableBody,
  TableCell,
  TableColumn,
  TableHeader,
  TableRow,
  Tooltip,
  useDisclosure,
} from '@nextui-org/react';
import {
  IconBrandFacebook,
  IconBrandInstagram,
  IconBrandX,
  IconCircleX,
  IconEdit,
  IconLink,
  IconSend2,
  IconTrashXFilled,
} from '@tabler/icons-react';
import { useEffect, useState } from 'react';
import { Form } from 'react-router-dom';
import { updateSocialMedia } from '../service';
import { useQueryClient } from '@tanstack/react-query';
import { toast } from 'react-toastify';

export const SocialMediaForm = ({ socialMedia = [] }) => {
  const { isOpen, onOpen, onOpenChange } = useDisclosure();
  const [isLoading, setIsLoading] = useState(false);
  const [socialMediaUrls, setSocialMediaUrls] = useState([]);
  const queryClient = useQueryClient();

  useEffect(() => {
    setSocialMediaUrls(socialMedia.map(({ name, url }) => ({ name, url })));
  }, [socialMedia]);

  const socialIcon = (name) => {
    switch (name) {
      case 'facebook':
        return <IconBrandFacebook />;
      case 'instagram':
        return <IconBrandInstagram />;
      case 'xtweet':
        return <IconBrandX />;

      default:
        return <IconLink />;
    }
  };

  const handleSubmit = async (onClose) => {
    try {
      setIsLoading(true);
      await updateSocialMedia(socialMediaUrls);
      toast.success('Redes sociales actualizadas');
      queryClient.invalidateQueries({
        queryKey: ['user'],
      });
      onClose();
    } catch (error) {
      toast.error('Error al actualizar redes sociales');
      console.log(error);
    } finally {
      setIsLoading(false);
    }
  };

  const handleInputChange = (e, index) => {
    const { name, value } = e.target;
    const updatedSocialMediaUrls = [...socialMediaUrls];
    updatedSocialMediaUrls[index] = {
      ...updatedSocialMediaUrls[index],
      [name]: value,
    };
    setSocialMediaUrls(updatedSocialMediaUrls);
  };

  const handleEmptySocialMedia = (e, name) => {
    const updatedSocialMediaUrls = socialMediaUrls.map((social) => {
      if (social.name === name) {
        return { ...social, url: '' };
      }
      return social;
    });
    setSocialMediaUrls(updatedSocialMediaUrls);
  };

  return (
    <Form className="mt-4">
      <Button
        color="primary"
        size="md"
        startContent={<IconEdit />}
        onPress={onOpen}
      >
        Editar
        <Modal
          isOpen={isOpen}
          onOpenChange={onOpenChange}
          placement="center"
          className={`text-foreground bg-background border border-white`}
          size="3xl"
        >
          <ModalContent>
            {(onClose) => (
              <>
                <ModalHeader className="flex flex-col gap-1">
                  Actualizar Redes Sociales
                </ModalHeader>
                <ModalBody>
                  {isLoading ? (
                    <Spinner />
                  ) : (
                    <Table
                      aria-label="RRSS de la protectora"
                      className="mx-auto max-w-lg "
                    >
                      <TableHeader>
                        <TableColumn>RRSS</TableColumn>
                        <TableColumn>Perfil</TableColumn>
                        <TableColumn>Acciones</TableColumn>
                      </TableHeader>
                      <TableBody
                        emptyContent={'No hay redes sociales disponibles.'}
                      >
                        {socialMediaUrls.map((social, index) => (
                          <TableRow key={index}>
                            <TableCell>{socialIcon(social.name)}</TableCell>
                            <TableCell>
                              <Input
                                type="text"
                                name="url"
                                value={social.url}
                                onChange={(e) => handleInputChange(e, index)}
                              />
                            </TableCell>
                            <TableCell>
                              <div className="relative flex items-center gap-2">
                                <Tooltip color="danger" content="Eliminar RRSS">
                                  <Button
                                    isIconOnly
                                    variant="solid"
                                    color="danger"
                                    size="sm"
                                    onClick={(e) =>
                                      handleEmptySocialMedia(e, social.name)
                                    }
                                  >
                                    <IconTrashXFilled />
                                  </Button>
                                </Tooltip>
                              </div>
                            </TableCell>
                          </TableRow>
                        ))}
                      </TableBody>
                    </Table>
                  )}
                </ModalBody>
                <ModalFooter className="flex justify-center gap-4 w-full">
                  <Button
                    color="primary"
                    variant="solid"
                    size="sm"
                    startContent={<IconCircleX />}
                    className="px-10 font-poppins font-semibold text-sm"
                    onPress={onClose}
                  >
                    Cancelar
                  </Button>
                  <Button
                    color="primary"
                    variant="solid"
                    size="sm"
                    startContent={<IconSend2 />}
                    className="px-10 font-poppins font-semibold text-sm"
                    onPress={() => handleSubmit(onClose)}
                  >
                    Enviar
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
export default SocialMediaForm;
