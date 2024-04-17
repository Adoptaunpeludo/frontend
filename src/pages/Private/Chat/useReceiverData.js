import { useQuery } from '@tanstack/react-query';

import { getReceiverData } from './service';

export const receiverDataQuery = (username) => {
  return {
    queryKey: ['shelter-data', username],
    queryFn: () => getReceiverData(username),
    staleTime: 1000 * 60 * 15,
  };
};

export const useReceiverData = (username) => {
  const { data, isLoading, isFetching, isError } = useQuery(
    receiverDataQuery(username)
  );

  return { data, isLoading, isFetching, isError };
};
