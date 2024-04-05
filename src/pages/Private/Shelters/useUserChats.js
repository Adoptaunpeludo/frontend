import { useQuery } from '@tanstack/react-query';
import { getUserChats } from './service';

export const userChatsQuery = (username) => {
  return {
    queryKey: ['user-chats', username],
    queryFn: getUserChats,
    staleTime: 1000 * 60 * 15,
  };
};

export const useUserChats = (username) => {
  const { data, isLoading, isFetching, isError } = useQuery(
    userChatsQuery(username)
  );

  return { data, isLoading, isFetching, isError };
};
