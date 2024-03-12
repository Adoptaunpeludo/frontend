import { useQuery } from '@tanstack/react-query';
import { getAnimalDetails } from './service';

export const animalDetailsQuery = (slug) => {
  return {
    queryKey: ['animalDetails', slug],
    queryFn: async () => getAnimalDetails(slug),
  };
};

export const useAnimalDetails = (slug) => {
  const { data, isLoading, isError } = useQuery(animalDetailsQuery(slug));

  return { data, isLoading, isError };
};
