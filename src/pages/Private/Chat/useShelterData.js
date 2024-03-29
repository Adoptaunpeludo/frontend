import { useQuery } from '@tanstack/react-query';
import { getShelterData } from './service';

export const shelterDataQuery = (username) => {
  return {
    queryKey: ['shelter-data', username],
    queryFn: () => getShelterData(username),
    staleTime: 1000 * 60 * 15,
  };
};

export const useShelterData = (username) => {
  const { data, isLoading, isFetching, isError } = useQuery(
    shelterDataQuery(username)
  );

  return { data, isLoading, isFetching, isError };
};
