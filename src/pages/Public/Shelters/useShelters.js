import { useQuery } from '@tanstack/react-query';
import { getShelters } from './service';

export const sheltersQuery = (role, params = {}) => {
  let queryFn = getShelters;

  const { username, city, limit } = params;

  return {
    queryKey: ['shelters', role, username ?? '', city, limit],
    queryFn: () => queryFn(params),
    staleTime: 1000 * 60 * 15,
  };
};

export const useShelters = (role, params = {}) => {
  const { data, isLoading, isFetching, isError } = useQuery(
    sheltersQuery(role, params)
  );

  return { data, isLoading, isFetching, isError };
};
