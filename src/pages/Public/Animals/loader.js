import { animalsQuery } from '../Landing/useAnimals';

export const loader =
  (queryClient, page) =>
  async ({ request, params }) => {
    const filters = Object.fromEntries([
      ...new URL(request.url).searchParams.entries(),
    ]);
    if (filters.name) filters.name = filters.name.toLowerCase();
    try {
      await queryClient.ensureQueryData(animalsQuery(page, filters, params));
      return { filters, params };
    } catch (error) {
      console.log(error);
      throw error;
    }
  };
