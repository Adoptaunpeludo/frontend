import {
  Button,
  Modal,
  ModalBody,
  ModalContent,
  ModalFooter,
  ModalHeader,
  Radio,
  RadioGroup,
  Textarea,
  useDisclosure,
} from '@nextui-org/react';
import { IconCircleX, IconEdit, IconSend2 } from '@tabler/icons-react';
import { useEffect, useState } from 'react';
import { Form, useNavigation } from 'react-router-dom';
import { H2Title, H4Title, Panel } from '../../../../components';

import {
  AnimalBioForm,
  OtherPropertiesCatForm,
  OtherPropertiesDogForm,
  StatusShelterForm,
} from './Components';

import { UploadImagesForm } from './Components/UploadImagesForm';
import { useAnimalDetails } from '../../../Public/Animals/AnimalDetails/useAnimalDetails';
import { useModalContext } from '../../../../context/ModalContext';
import { useAnimalImagesContext } from '../../../../context/AnimalImagesContext';

const AnimalForm = ({ slug = '' }) => {
  const createAnimalModal = useDisclosure();
  const { isOpen, onOpen, onOpenChange } = createAnimalModal;
  const { data } = useAnimalDetails(slug);
  const { saveModal } = useModalContext();
  const { images, setImages } = useAnimalImagesContext();

  const navigation = useNavigation();

  const isSubmitting = navigation.state === 'submitting';

  const [pet, usePet] = useState(data?.type || 'cat');

  useEffect(() => {
    saveModal(createAnimalModal);
  }, []);

  return (
    <Button
      color="primary"
      size="md"
      startContent={<IconEdit />}
      onPress={onOpen}
      className="my-4"
    >
      Crear Anuncio Adopción
      <Modal
        isOpen={isOpen}
        onOpenChange={onOpenChange}
        placement="center"
        scrollBehavior="outside"
        className={`text-foreground bg-background border border-white`}
        size="4xl"
        onClose={() => setImages([])}
      >
        <Form method="post" preventScrollReset={true}>
          <ModalContent>
            {(onClose) => (
              <>
                <ModalHeader className="flex flex-col">
                  Nuevo anuncio de adopción
                </ModalHeader>
                <ModalBody>
                  <section className="max-w-screen-xl w-full flex flex-col h-full justify-center mx-auto ">
                    <Panel className=" max-w-4xl mx-auto flex flex-col py-4 px-10 justify-center">
                      <H2Title title="Peludo" className="mx-auto pb-5" />
                      <div className="max-w-96 flex flex-col justify-center rounded-lg bg-default-100 mx-auto px-10 py-2">
                        <RadioGroup
                          isDisabled={isSubmitting}
                          orientation="horizontal"
                          name="type"
                          className="flex justify-center font-semibold"
                          value={pet}
                          onValueChange={usePet}
                          isReadOnly={data?.type}
                        >
                          <Radio value={'cat'}>Gato</Radio>
                          <Radio value={'dog'}>Perro</Radio>
                        </RadioGroup>
                      </div>
                      <div className="flex flex-col gap-6 max-w-4xl mx-auto px-10 ">
                        <div className="flex w-full flex-col gap-4">
                          <AnimalBioForm
                            data={data}
                            isDisabled={isSubmitting}
                          />
                          {pet === 'cat' && (
                            <OtherPropertiesCatForm
                              data={data}
                              isDisabled={isSubmitting}
                            />
                          )}
                          {pet === 'dog' && (
                            <OtherPropertiesDogForm
                              data={data}
                              isDisabled={isSubmitting}
                            />
                          )}
                          <StatusShelterForm
                            data={data}
                            isDisabled={isSubmitting}
                          />
                          <H4Title title="Descripción:" className="mx-2" />
                          <Textarea
                            className="w-full "
                            name="description"
                            label="Descripción"
                            isDisabled={isSubmitting}
                            defaultValue={
                              data?.description ? data?.description : ''
                            }
                          />
                        </div>
                      </div>
                      <UploadImagesForm images={images} setImages={setImages} />
                    </Panel>
                  </section>
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
                    type="submit"
                    name="intent"
                    value={'create-adoption'}
                    isLoading={isSubmitting}
                  >
                    Enviar
                  </Button>
                </ModalFooter>
              </>
            )}
          </ModalContent>
        </Form>
      </Modal>
    </Button>
  );
};
export default AnimalForm;
