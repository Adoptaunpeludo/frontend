import { useQuery } from '@tanstack/react-query';
import { getUserNotifications } from './service';

export const userNotificationsQuery = {
  queryKey: ['user-notifications'],
  queryFn: getUserNotifications,
  staleTime: Infinity,
  retry: false,
};

export const useNotifications = () => {
  const { data, isLoading, isError, isFetching } = useQuery(
    userNotificationsQuery
  );

  return { data, isLoading, isError, isFetching };
};
