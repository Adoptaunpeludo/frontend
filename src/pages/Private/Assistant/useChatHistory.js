import { getChatHistory } from './service';
import { useQuery } from '@tanstack/react-query';

export const chatHistoryQuery = (username) => {
  return {
    queryKey: ['chat-history', username],
    queryFn: async () => getChatHistory(),
    staleTime: 1000,
    retry: false,
  };
};

export const useChatHistory = (username) => {
  const { data, isError, isFetching } = useQuery(chatHistoryQuery(username));

  return { data, isFetching, isError };
};
