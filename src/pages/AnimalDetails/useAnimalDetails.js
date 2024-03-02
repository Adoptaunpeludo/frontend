import { useQuery } from '@tanstack/react-query';
import { getAnimalDetails } from './service';

export const animalDetailsQuery = () => {
  return {
    queryKey: ['animalDetails'],
    queryFn: async () => getAnimalDetails(),
  };
};

export const useAnimalDetails = () => {
  const { data, isLoading, isError } = useQuery(animalDetailsQuery());

  return { data, isLoading, isError };
};
