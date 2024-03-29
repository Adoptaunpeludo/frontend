import { useQuery } from '@tanstack/react-query';
import { getUserChats } from './service';

export const userChatsQuery = () => {
  return {
    queryKey: ['user-chats'],
    queryFn: () => getUserChats(),
    staleTime: 0,
  };
};

export const useUserChats = () => {
  const { data, isLoading, isFetching, isError } = useQuery(userChatsQuery());

  return { data, isLoading, isFetching, isError };
};
