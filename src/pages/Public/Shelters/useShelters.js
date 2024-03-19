import { useQuery } from '@tanstack/react-query';
import { getShelters } from './service';

export const sheltersQuery = (type, params = {}) => {
  let queryFn = getShelters;

  const { name, city, limit } = params;

  return {
    queryKey: ['shelters', type, name ?? '', city, limit],
    queryFn: () => queryFn(params),
    staleTime: 1000 * 60 * 15,
  };
};

export const useShelters = (type, params = {}) => {
  const { data, isLoading, isFetching, isError } = useQuery(
    sheltersQuery(type, params)
  );

  return { data, isLoading, isFetching, isError };
};
