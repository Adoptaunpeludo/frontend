import { userAnimalsQuery } from './useUserAnimals';

export const loader = (queryClient) => async () => {
  try {
    const data = await queryClient.ensureQueryData(
      userAnimalsQuery({ limit: 100 })
    );

    return data;
  } catch (error) {
    console.log(error);
    return error;
  }
};
