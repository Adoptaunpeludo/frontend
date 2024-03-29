import {
  Button,
  Radio,
  RadioGroup,
  Skeleton,
  Textarea,
} from '@nextui-org/react';
import { IconCircleX, IconSend2 } from '@tabler/icons-react';
import { useState } from 'react';
import {
  Form,
  redirect,
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

import { isAxiosError } from 'axios';
import { toast } from 'react-toastify';
import { useAnimalImagesContext } from '../../../../context/AnimalImagesContext';
import {
  inputStyleConfig,
  radioGroupStyleConfig,
  radioStyleConfig,
} from '../../../../utils/configFormFields';
import { handleNotFoundError } from '../../../../utils/handleError';
import {
  animalDetailsQuery,
  useAnimalDetails,
} from '../../../Public/Animals/useAnimalDetails';
import { ImagesFrame } from '../../shared';
import {
  createPetAdoption,
  updatePetAdoption,
  uploadAnimalImages,
} from './service';

export const action =
  (animalImages, queryClient) =>
  async ({ request, params }) => {
    let formData = await request.formData();
    let intent = formData.get('intent');

    console.log({ intent });

    if (intent === 'create-animal') {
      const imagesData = new FormData();

      animalImages?.forEach((image) => {
        imagesData.append('images', image);
      });

      try {
        const animal = await createPetAdoption(formData);
        await uploadAnimalImages(imagesData, animal.id);
        queryClient.invalidateQueries((queryKey) =>
          queryKey.includes('animal')
        );
        toast.success(`Animal ${animal.name} puesto en adopción`);
        return redirect(`/animals/${animal.type}s/${animal.slug}`);
      } catch (error) {
        if (isAxiosError(error) && error.response.status === 400)
          return toast.error('Error creando el anuncio de adopción');
        throw error;
      }
    }

    if (intent === 'update-animal') {
      const { slug } = params;

      try {
        const animal = await updatePetAdoption(formData, slug);
        queryClient.invalidateQueries((queryKey) =>
          queryKey.includes('animal')
        );
        toast.success(`Animal ${animal.name} Actualizado`);
        return redirect(`/animals/${animal.type}s/${animal.slug}`);
      } catch (error) {
        if (isAxiosError(error) && error.response.status === 400)
          return toast.error('Error actualizando el anuncio de adopción');
        throw error;
      }
    }
  };

export const loader =
  (queryClient) =>
  async ({ params }) => {
    console.log({ params });
    try {
      const { slug } = params;
      await queryClient.ensureQueryData(animalDetailsQuery(slug));
      return params;
    } catch (error) {
      if (error.response.status === 404) {
        const notFoundError = handleNotFoundError(error);
        throw notFoundError;
      }
      return error;
    }
  };

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

  const [isFormValid, setIsFormValid] = useState(true);

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
          <Form method="post">
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
                    label="Peludo"
                    classNames={radioGroupStyleConfig}
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
                    isDisabled={isSubmitting}
                    setIsFormValid={setIsFormValid}
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
                      isDisabled={isSubmitting}
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
                    isDisabled={isSubmitting}
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
                    isDisabled={!isFormValid}
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
