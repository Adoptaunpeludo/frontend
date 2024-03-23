import { useQuery } from '@tanstack/react-query';
import { getShelterAnimals, getShelterDetails } from './service';

export const shelterDetailsQuery = (username) => {
  return {
    queryKey: ['shelter-details', username],
    queryFn: () => getShelterDetails(username),
    retry: false,
  };
};

export const useShelterDetails = (username) => {
  const { data, isLoading, isError } = useQuery(shelterDetailsQuery(username));
  const shelter = data.users[0];
  return { data: shelter, isLoading, isError };
};

export const shelterAnimalsQuery = (shelterId) => {
  return {
    queryKey: ['shelter-animals', shelterId],
    queryFn: () => getShelterAnimals(shelterId),
    retry: false,
  };
};

export const useShelterAnimals = (username) => {
  const { data, isLoading, isError } = useQuery(shelterAnimalsQuery(username));

  return { data, isLoading, isError };
};
