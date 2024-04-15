import { handleNotFoundError } from '../../../../utils/handleError';
import { shelterDetailsQuery } from './useShelterDetails';

export const loader =
  (queryClient) =>
  async ({ params }) => {
    try {
      const { username } = params;
      await queryClient.ensureQueryData(shelterDetailsQuery(username));
      return params;
    } catch (error) {
      if (error.response.status === 404) {
        const notFoundError = handleNotFoundError(error);
        throw notFoundError;
      }

      throw error;
    }
  };
