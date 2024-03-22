import { useQuery } from '@tanstack/react-query';
import { getCurrentUser } from './service';

export const userQuery = {
  queryKey: ['user'],
  queryFn: getCurrentUser,
  staleTime: Infinity,
  retry: false,
};

export const useUser = () => {
  const { data, isLoading, isError, isFetching } = useQuery(userQuery);

  return { data, isLoading, isError, isFetching };
};
