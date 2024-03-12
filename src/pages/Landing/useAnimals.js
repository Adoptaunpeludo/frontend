import { useQuery } from '@tanstack/react-query';
import { getCats, getDogs } from './service';

export const animalsQuery = (type) => {
  return {
    queryKey: ['animals', type],
    queryFn: () => (type === 'cats' ? getCats() : getDogs()),
  };
};

export const useAnimals = (type) => {
  let query;

  query = type === 'cats' ? getCats() : getDogs();

  const { data, isLoading, isError } = useQuery(query());

  return { data, isLoading, isError };
};
