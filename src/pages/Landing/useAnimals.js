import { useQuery } from '@tanstack/react-query';
import { getCats, getDogs } from './service';

export const animalsQuery = (type) => {
  const queryFn = type === 'cats' ? getCats : getDogs;

  return {
    queryKey: ['animals', type],
    queryFn: () => queryFn(),
  };
};

export const useAnimals = (type) => {
  const { data, isLoading, isError } = useQuery(animalsQuery(type));

  return { data, isLoading, isError };
};
