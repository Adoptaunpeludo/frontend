import { sheltersQuery } from './useShelters';

export const loader =
  (queryClient) =>
  async ({ request }) => {
    const params = Object.fromEntries([
      ...new URL(request.url).searchParams.entries(),
    ]);
    try {
      await queryClient.ensureQueryData(sheltersQuery(params));
      return { params };
    } catch (error) {
      console.log(error);
      throw error;
    }
  };
