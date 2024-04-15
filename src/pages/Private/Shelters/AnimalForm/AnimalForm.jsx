import {
  Button,
  Radio,
  RadioGroup,
  Skeleton,
  Textarea,
} from '@nextui-org/react';
import { IconCircleX, IconSend2 } from '@tabler/icons-react';
import { useEffect, useRef, useState } from 'react';
import {
  Form,
  useLoaderData,
  useNavigate,
  useNavigation,
} from 'react-router-dom';
import { H2Title, Panel, TitleSection } from '../../../../components';

import {
  AnimalBioForm,
  OtherPropertiesCatForm,
  OtherPropertiesDogForm,
  StatusShelterForm,
} from './Components';

import { UploadImagesForm } from './Components/UploadImagesForm';

import { useAnimalImagesContext } from '../../../../context/AnimalImagesContext';
import {
  inputStyleConfig,
  radioGroupStyleConfig,
  radioStyleConfig,
} from '../../../../utils/configFormFields';
import { useAnimalDetails } from '../../../Public/Animals/useAnimalDetails';
import { ImagesFrame } from '../../shared';
import { useGetErrors } from '../../../../context/FormErrorsContext';
import { action } from './action';

const AnimalForm = () => {
  const { images, setImages } = useAnimalImagesContext();
  const params = useLoaderData();

  let slug;

  if (params) slug = params.slug;

  const { data, isLoading } = useAnimalDetails(slug);

  const navigation = useNavigation();
  const navigate = useNavigate();

  const isSubmitting = navigation.state === 'submitting';

  const [pet, usePet] = useState(data?.type || '');

  const [isRadioChecked, setIsRadioChecked] = useState(!!pet);
  const { errors } = useGetErrors();

  const isFormValid = Object.values(errors).every((error) => error === '');
  const isFirstRender = useRef(true);

  useEffect(() => {
    if (!isFirstRender.current) {
      setIsRadioChecked(true);
    }
    isFirstRender.current = false;
  }, [pet]);

  return (
    <main className="bg-default-100 flex-grow">
      <section
        id="AnimalCreateUpdatePage"
        className="max-w-screen-xl w-full flex  flex-col justify-center  h-full  py-12  mx-auto gap-5"
      >
        <TitleSection
          title={data?.name !== undefined ? data.name : 'Nuevo peludo'}
          id=" AnimalTitle"
        />
        <section id="AnimalDataForm">
          <Form
            method="post"
            onKeyDown={(event) => {
              if (event.key === 'Enter') event.preventDefault();
            }}
            action={action}
          >
            <H2Title
              title={
                slug
                  ? 'Edita el anuncio de adopción del peludo'
                  : 'Nuevo anuncio de adopción'
              }
              className=" normal-case"
            />
            <Panel className={'flex-col mx-5 my-5 py-5'}>
              <section className="max-w-screen-xl flex flex-col justify-center flex-grow px-5 gap-10">
                <div className="flex flex-col mx-auto">
                  <RadioGroup
                    isDisabled={isSubmitting}
                    orientation="horizontal"
                    name="type"
                    className="font-bold"
                    value={pet}
                    onValueChange={usePet}
                    isReadOnly={data?.type}
                    label={slug ? 'Peludo' : 'Seleccione peludo'}
                    classNames={radioGroupStyleConfig}
                    isRequired
                  >
                    <Radio value={'cat'} classNames={radioStyleConfig}>
                      Gato
                    </Radio>
                    <Radio value={'dog'} classNames={radioStyleConfig}>
                      Perro
                    </Radio>
                  </RadioGroup>
                </div>
                <Skeleton isLoaded={!isLoading}>
                  <AnimalBioForm
                    data={data ? data : {}}
                    isDisabled={isSubmitting || !isRadioChecked}
                  />
                </Skeleton>
                <Skeleton isLoaded={!isLoading}>
                  <section id="AnimalOtherFeatures">
                    {pet === 'cat' && (
                      <OtherPropertiesCatForm
                        data={data ? data : {}}
                        isDisabled={isSubmitting}
                      />
                    )}

                    {pet === 'dog' && (
                      <OtherPropertiesDogForm
                        data={data ? data : {}}
                        isDisabled={isSubmitting}
                      />
                    )}
                  </section>
                </Skeleton>
                <Skeleton isLoaded={!isLoading}>
                  <section id="shelterStatus">
                    <StatusShelterForm
                      data={data ? data : {}}
                      isDisabled={isSubmitting || !isRadioChecked}
                    />
                  </section>
                </Skeleton>
                <section
                  id="animalDescription "
                  className="flex flex-col gap-2"
                >
                  <H2Title title="Descripción:" className="mx-2" />
                  <Textarea
                    className="w-full border-primary border-t-1 pt-3"
                    name="description"
                    label="Descripción"
                    isDisabled={isSubmitting || !isRadioChecked}
                    defaultValue={data?.description ? data?.description : ''}
                    classNames={inputStyleConfig}
                    isRequired
                  />
                </section>
                <Skeleton isLoaded={!isLoading}>
                  {!data && (
                    <UploadImagesForm images={images} setImages={setImages} />
                  )}
                </Skeleton>
              </section>
              <Skeleton isLoaded={!isLoading}>
                <section
                  id="buttonsForm"
                  className="flex justify-center gap-4 w-full"
                >
                  <Button
                    color="primary"
                    variant="solid"
                    size="sm"
                    startContent={<IconCircleX />}
                    className="px-10 my-4 font-poppins font-regular text-sm"
                    onPress={() => navigate(-1)}
                  >
                    Cancelar
                  </Button>
                  <Button
                    isDisabled={!isFormValid || !isRadioChecked}
                    color="primary"
                    variant="solid"
                    size="sm"
                    endContent={<IconSend2 />}
                    className="px-10 my-4 font-poppins font-regular text-sm"
                    type="submit"
                    name="intent"
                    value={slug ? 'update-animal' : 'create-animal'}
                    isLoading={isSubmitting}
                  >
                    {slug ? 'Editar Anuncio' : 'Crear Anuncio'}
                  </Button>
                </section>
              </Skeleton>
            </Panel>
          </Form>
        </section>
      </section>
      <Skeleton isLoaded={!isLoading}>
        {data && (
          <ImagesFrame
            images={data.images}
            page="update-animal"
            id={data.id}
            slug={data.slug}
          />
        )}
      </Skeleton>
    </main>
  );
};
export default AnimalForm;
