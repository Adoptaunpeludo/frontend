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
import { useQueryClient } from '@tanstack/react-query';
import { useEffect, useState } from 'react';
import { Form } from 'react-router-dom';
import { toast } from 'react-toastify';
import { H3Title } from '../../../../../components';
import {
  buttonStyleConfig,
  inputStyleConfig,
  tableStyleConfig,
} from '../../../../../utils/configFormFields';
import { updateSocialMedia } from '../service';

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
        return <IconBrandFacebook className="size-10" />;
      case 'instagram':
        return <IconBrandInstagram className="size-10" />;
      case 'xtweet':
        return <IconBrandX className="size-10" />;

      default:
        return <IconLink className="size-10" />;
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
        className={buttonStyleConfig}
      >
        Editar
        <Modal
          isOpen={isOpen}
          onOpenChange={onOpenChange}
          placement="center"
          className={`text-foreground bg-background border border-white`}
          size="lg"
        >
          <ModalContent>
            {(onClose) => (
              <>
                <ModalHeader className="flex flex-col ">
                  <H3Title
                    title="Actualiza tus Redes Sociales"
                    className="border-b-1 border-primary normal-case"
                  />
                </ModalHeader>
                <ModalBody>
                  {isLoading ? (
                    <Spinner />
                  ) : (
                    <Table
                      aria-label="RRSS de la protectora"
                      className="mx-auto max-w-lg "
                      shadow="none"
                      classNames={tableStyleConfig}
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
                                classNames={inputStyleConfig}
                                // placeholder="@userName"
                              />
                            </TableCell>
                            <TableCell className=" flex justify-center">
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
                    className="px-10 font-poppins font-regular text-sm"
                    onPress={onClose}
                  >
                    Cancelar
                  </Button>
                  <Button
                    color="primary"
                    variant="solid"
                    size="sm"
                    endContent={<IconSend2 />}
                    className="px-10 font-poppins font-regular text-sm"
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
