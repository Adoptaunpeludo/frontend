import {
  Button,
  Radio,
  RadioGroup,
  Skeleton,
  Textarea,
} from '@nextui-org/react';
import { IconSend2 } from '@tabler/icons-react';
import { useState } from 'react';
import { Form, redirect, useLoaderData, useNavigation } from 'react-router-dom';
import { H2Title, H4Title, Panel } from '../../../../components';

import {
  AnimalBioForm,
  OtherPropertiesCatForm,
  OtherPropertiesDogForm,
  StatusShelterForm,
} from './Components';

import { UploadImagesForm } from './Components/UploadImagesForm';

import { useAnimalImagesContext } from '../../../../context/AnimalImagesContext';
import { ImagesFrame } from '../../shared';
import {
  createPetAdoption,
  updatePetAdoption,
  uploadAnimalImages,
} from './service';
import { toast } from 'react-toastify';
import {
  animalDetailsQuery,
  useAnimalDetails,
} from '../../../Public/Animals/useAnimalDetails';
import { handleNotFoundError } from '../../../../utils/handleError';

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
        console.log(error);
        toast.error('Error creando anuncio de adopción');
        return null;
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
        console.log(error);
        toast.error('Error creando anuncio de adopción');
        return null;
      }
    }
  };

export const loader =
  (queryClient) =>
  async ({ params }) => {
    try {
      const { slug } = params;
      await queryClient.ensureQueryData(animalDetailsQuery(slug));
      return params;
    } catch (error) {
      if (error.response.status === 404) {
        const notFoundError = handleNotFoundError(error);
        throw notFoundError;
      }

      throw error;
    }
  };

const AnimalForm = () => {
  const { images, setImages } = useAnimalImagesContext();
  const params = useLoaderData();

  let slug;

  if (params) slug = params.slug;

  const { data, isLoading } = useAnimalDetails(slug);

  const navigation = useNavigation();

  const isSubmitting = navigation.state === 'submitting';

  const [pet, usePet] = useState(data?.type || 'cat');

  return (
    <Skeleton
      isLoaded={!isLoading}
      className=" max-w-4xl mx-auto flex flex-col py-4 px-10 justify-center"
    >
      <Form method="post">
        <h3 className="py-4 text-center">
          {slug ? 'Editar Anuncio' : 'Nuevo anuncio de adopción'}
        </h3>

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
                <AnimalBioForm data={data} isDisabled={isSubmitting} />
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
                <StatusShelterForm data={data} isDisabled={isSubmitting} />
                <H4Title title="Descripción:" className="mx-2" />
                <Textarea
                  className="w-full "
                  name="description"
                  label="Descripción"
                  isDisabled={isSubmitting}
                  defaultValue={data?.description ? data?.description : ''}
                />
              </div>
            </div>
            {!data && (
              <UploadImagesForm images={images} setImages={setImages} />
            )}
          </Panel>
        </section>
        <div className="flex justify-center gap-4 w-full">
          <Button
            color="primary"
            variant="solid"
            size="sm"
            startContent={<IconSend2 />}
            className="px-10 my-4 font-poppins font-semibold text-sm"
            type="submit"
            name="intent"
            value={slug ? 'update-animal' : 'create-animal'}
            isLoading={isSubmitting}
          >
            {slug ? 'Editar Anuncio' : 'Crear Anuncio'}
          </Button>
        </div>
      </Form>
      {data && (
        <ImagesFrame
          images={data.images}
          page="update-animal"
          id={data.id}
          slug={data.slug}
        />
      )}
    </Skeleton>
  );
};
export default AnimalForm;
