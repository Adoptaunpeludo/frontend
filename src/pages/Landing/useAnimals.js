import { useQuery } from '@tanstack/react-query';
import { getCats, getDogs } from './service';

export const animalsQuery = (type, params) => {
  const queryFn = type === 'cats' ? getCats : getDogs;

  const { name, size, gender, age, city } = params;

  return {
    queryKey: ['animals', type, name ?? '', size, gender, age, city],
    queryFn: () => queryFn(params),
    staleTime: 1000 * 60 * 15,
  };
};

export const useAnimals = (type, params) => {
  const { data, isLoading, isFetching, isError } = useQuery(
    animalsQuery(type, params)
  );

  return { data, isLoading, isFetching, isError };
};
