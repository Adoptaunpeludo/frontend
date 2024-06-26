import { useQuery } from '@tanstack/react-query';

import { getCurrentChat } from './service';

export const currentChatQuery = (slug) => {
  return {
    queryKey: ['current-chat', slug],
    queryFn: () => getCurrentChat(slug),
    staleTime: 1000 * 60 * 15,
  };
};

export const useCurrentChat = (slug) => {
  const { data, isLoading, isFetching, isError } = useQuery(
    currentChatQuery(slug)
  );

  return { data, isLoading, isFetching, isError };
};
