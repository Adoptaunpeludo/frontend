import { toast } from 'react-toastify';
import { getChatHistory } from './service';
import { useQuery } from '@tanstack/react-query';

export const chatHistoryQuery = (token, username) => {
  return {
    queryKey: ['chat-history', username],
    queryFn: async () => getChatHistory(token),
    staleTime: Infinity,
    onError: (error) => {
      console.log(error);
      toast.error(error);
    },
  };
};

export const useChatHistory = (token, username) => {
  const { data, isError, isFetching } = useQuery(
    chatHistoryQuery(token, username)
  );

  return { data, isFetching, isError };
};
