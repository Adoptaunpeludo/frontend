import { useQuery } from '@tanstack/react-query';
import { getUserAnimals } from './service';

export const userAnimalsQuery = {
  queryKey: ['user-animals'],
  queryFn: getUserAnimals,
  staleTime: 1000 * 60 * 15,
};

export const useUserAnimals = () => {
  const { data, isLoading, isFetching, isError } = useQuery(userAnimalsQuery);

  return { data, isLoading, isFetching, isError };
};
