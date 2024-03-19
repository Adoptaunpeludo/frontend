import { useQuery } from '@tanstack/react-query';
import { getUserAnimals } from './service';

export const userAnimalsQuery = (params = {}) => {
  const { limit } = params;

  return {
    queryKey: ['user-animals', limit],
    queryFn: () => getUserAnimals(params),
    staleTime: 1000 * 60 * 15,
  };
};

export const useUserAnimals = (params = {}) => {
  const { data, isLoading, isFetching, isError } = useQuery(
    userAnimalsQuery(params)
  );

  return { data, isLoading, isFetching, isError };
};
