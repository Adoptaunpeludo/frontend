import { toast } from 'react-toastify';
import { getChatHistory } from './service';
import { useQuery } from '@tanstack/react-query';

export const chatHistoryQuery = (username) => {
  return {
    queryKey: ['chat-history', username],
    queryFn: async () => getChatHistory(username),
    staleTime: Infinity,
    onError: (error) => {
      console.log(error);
      toast.error(error);
    },
  };
};

export const useChatHistory = (username) => {
  const { data, isError, isFetching } = useQuery(chatHistoryQuery(username));

  return { data, isFetching, isError };
};
