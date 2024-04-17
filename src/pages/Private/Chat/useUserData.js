import { useQuery } from '@tanstack/react-query';

import { getUserData } from './service';

export const userDataQuery = (username) => {
  return {
    queryKey: ['user-data', username],
    queryFn: () => getUserData(username),
    staleTime: 1000 * 60 * 15,
  };
};

export const useUserData = (username) => {
  const { data, isLoading, isFetching, isError } = useQuery(
    userDataQuery(username)
  );

  return { data, isLoading, isFetching, isError };
};
