import { useQuery } from '@tanstack/react-query';
import { getUserAnimals, getUserFavs } from './service';

export const userAnimalsQuery = (role, params = {}) => {
  const { limit } = params;

  console.log({ role });

  const queryFn =
    role === 'shelter' ? () => getUserAnimals(params) : () => getUserFavs();

  console.log({ queryFn });

  return {
    queryKey: [`${role === 'shelter' ? 'user-animals' : 'user-favs'}`, limit],
    queryFn: () => queryFn(),
    staleTime: 1000 * 60 * 15,
  };
};

export const useUserAnimals = (role, params = {}) => {
  const { data, isLoading, isFetching, isError } = useQuery(
    userAnimalsQuery(role, params)
  );

  return { data, isLoading, isFetching, isError };
};
