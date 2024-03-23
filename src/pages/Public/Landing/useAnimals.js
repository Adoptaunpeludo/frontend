import { useQuery } from '@tanstack/react-query';
import { getAnimals, getCats, getDogs } from './service';

export const animalsQuery = (type, filters = {}, params = {}) => {
  let queryFn;

  if (type === 'cats') queryFn = () => getCats(filters);
  if (type === 'dogs') queryFn = () => getDogs(filters);
  if (type === 'all') queryFn = () => getAnimals(filters);
  if (type === 'shelters')
    queryFn = () => getAnimals(filters, params.shelterName);
  const { name, size, gender, age, city, limit, page } = filters;

  const queryKey = params?.shelterName
    ? [
        'shelters-animals',
        params.shelterName,
        name ?? '',
        size,
        gender,
        age,
        city,
        limit,
        page,
      ]
    : ['animals', type, name ?? '', size, gender, age, city, limit, page];

  return {
    queryKey,
    queryFn: () => queryFn(),
    staleTime: 1000 * 60 * 15,
  };
};

export const useAnimals = (type, filters, params = {}) => {
  const { data, isLoading, isFetching, isError } = useQuery(
    animalsQuery(type, filters, params)
  );

  return { data, isLoading, isFetching, isError };
};
