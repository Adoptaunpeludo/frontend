import { toast } from 'react-toastify';
import { getChatHistory } from './service';
import { useQuery } from '@tanstack/react-query';

export const chatHistoryQuery = (document) => {
  return {
    queryKey: ['documentHistory', document],
    queryFn: async () => getChatHistory(document),
    staleTime: 1000,
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
