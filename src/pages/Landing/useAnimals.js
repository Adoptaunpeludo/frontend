import { useQuery } from '@tanstack/react-query';
import { getAnimals, getCats, getDogs } from './service';

export const animalsQuery = (type, params = {}) => {
  let queryFn;

  if (type === 'cats') queryFn = getCats;
  if (type === 'dogs') queryFn = getDogs;
  if (type === 'all') queryFn = getAnimals;

  const { name, size, gender, age, city, limit } = params;

  return {
    queryKey: ['animals', type, name ?? '', size, gender, age, city, limit],
    queryFn: () => queryFn(params),
    staleTime: 1000 * 60 * 15,
  };
};

export const useAnimals = (type, params = {}) => {
  const { data, isLoading, isFetching, isError } = useQuery(
    animalsQuery(type, params)
  );

  return { data, isLoading, isFetching, isError };
};
