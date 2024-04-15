import { handleNotFoundError } from '../../../../utils/handleError';
import { animalDetailsQuery } from '../../../Public/Animals/useAnimalDetails';

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
      return error;
    }
  };
