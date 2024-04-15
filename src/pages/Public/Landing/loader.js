import { animalsQuery } from './useAnimals';

export const loader = (queryClient) => () => {
  const { data: cats } = queryClient.ensureQueryData(animalsQuery('cats'));
  const { data: dogs } = queryClient.ensureQueryData(animalsQuery('dogs'));
  const { data: animals } = queryClient.ensureQueryData(animalsQuery('all'));

  return { cats, dogs, animals };
};
