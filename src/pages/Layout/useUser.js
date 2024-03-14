import { useQuery } from '@tanstack/react-query';
import { getCurrentUser } from './service';

export const userQuery = {
  queryKey: ['user'],
  queryFn: getCurrentUser,
  staleTime: 1000 * 60 * 15,
};

export const useUser = () => {
  const { data, isLoading, isError } = useQuery(userQuery);

  return { data, isLoading, isError };
};
