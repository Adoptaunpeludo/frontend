import { useQuery } from '@tanstack/react-query';
import { getChatHistory } from './service';

export const chatHistoryQuery = (chat) => {
  return {
    queryKey: ['chat-history', chat],
    queryFn: () => getChatHistory(chat),
    staleTime: 1000,
    retry: false,
  };
};

export const useChatHistory = (chat) => {
  const { data, isLoading, isFetching, isError } = useQuery(
    chatHistoryQuery(chat)
  );

  return { data, isLoading, isFetching, isError };
};
