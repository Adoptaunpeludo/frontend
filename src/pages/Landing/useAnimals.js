import { useQuery } from '@tanstack/react-query';
import { getCats, getDogs } from './service';

export const animalsQuery = (type, params = {}) => {
  const queryFn = type === 'cats' ? getCats : getDogs;

  return {
    queryKey: ['animals', type],
    queryFn: () => queryFn(params),
  };
};

export const useAnimals = (type, params = {}) => {
  const { data, isLoading, isError } = useQuery(animalsQuery(type, params));

  return { data, isLoading, isError };
};
