import { userAnimalsQuery } from './useUserAnimals';

export const loader = (queryClient) => async () => {
  try {
    const data = await queryClient.ensureQueryData(userAnimalsQuery);

    return data;
  } catch (error) {
    console.log(error);
  }
};
