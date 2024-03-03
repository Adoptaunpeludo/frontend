import { useQuery } from '@tanstack/react-query';
import { getDogs } from './service';

export const catsQuery = () => {
  return {
    queryKey: ['dogs'],
    queryFn: async () => getDogs(),
  };
};

export const useDogs = () => {
  const { data, isLoading, isError } = useQuery(catsQuery());

  return { data, isLoading, isError };
};
