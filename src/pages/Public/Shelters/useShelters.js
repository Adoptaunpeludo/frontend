import { useQuery } from '@tanstack/react-query';
import { getShelters } from './service';

export const sheltersQuery = (params = {}) => {
  const { username, city, limit } = params;

  return {
    queryKey: ['shelters', username, city, limit],
    queryFn: () => getShelters(params),
    staleTime: 1000 * 60 * 15,
  };
};

export const useShelters = (params = {}) => {
  const { data, isLoading, isFetching, isError } = useQuery(
    sheltersQuery(params)
  );

  return { data, isLoading, isFetching, isError };
};
