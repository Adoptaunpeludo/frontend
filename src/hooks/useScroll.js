import { useEffect, useRef } from 'react';

export const useScroll = (messages, isFirstLoad, isFetching) => {
  const messagesEndRef = useRef(null);

  const scrollToBottom = (type) => {
    messagesEndRef.current?.scrollIntoView({ behavior: type });
  };

  useEffect(() => {
    if (!isFirstLoad) scrollToBottom('smooth');
  }, [messages, isFirstLoad]);

  useEffect(() => {
    if (isFirstLoad && !isFetching) {
      scrollToBottom('instant');
    }
  }, [isFirstLoad, isFetching]);

  return { messagesEndRef };
};
