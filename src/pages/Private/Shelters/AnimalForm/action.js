import { isAxiosError } from 'axios';
import { redirect } from 'react-router-dom';
import { toast } from 'react-toastify';
import {
  updatePetAdoption,
  uploadAnimalImages,
  createPetAdoption,
} from './service';
import { isMatchFormData } from '../../../../utils/isMatchFormData';
import { getAnimalDetails } from '../../../Public/Animals/service';

export const action =
  (animalImages, queryClient) =>
  async ({ request, params }) => {
    let formData = await request.formData();
    let intent = formData.get('intent');
    const compareData = Object.fromEntries(formData);
    const { slug } = params;
    const fetchData = await getAnimalDetails(slug);

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
      // const { slug } = params;
      try {
        if (isMatchFormData(compareData, fetchData))
          return toast.error('Ningun dato modificado');
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
