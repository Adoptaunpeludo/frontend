import { useQuery } from '@tanstack/react-query';
import { getAnimalDetails } from './service';

export const animalDetailsQuery = (slug) => {
  return {
    queryKey: ['animal-details', slug],
    queryFn: () => getAnimalDetails(slug),
    retry: false,
  };
};

export const useAnimalDetails = (slug) => {
  const { data, isLoading, isError } = useQuery(animalDetailsQuery(slug));

  return { data, isLoading, isError };
};
