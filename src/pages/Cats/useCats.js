import { useQuery } from '@tanstack/react-query';
import { getCats } from './service';

export const catsQuery = () => {
  return {
    queryKey: ['cats'],
    queryFn: async () => getCats(),
  };
};

export const useCats = () => {
  const { data, isLoading, isError } = useQuery(catsQuery());

  return { data, isLoading, isError };
};
