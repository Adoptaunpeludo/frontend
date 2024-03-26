import { useEffect, useRef } from 'react';

export const useScroll = (messages, isFetching) => {
  const messagesEndRef = useRef(null);

  const scrollToBottom = (type) => {
    messagesEndRef.current?.scrollIntoView({ behavior: type });
  };

  useEffect(() => {
    scrollToBottom('smooth');
  }, [messages]);

  useEffect(() => {
    if (!isFetching) {
      scrollToBottom('instant');
    }
  }, [isFetching]);

  return { messagesEndRef };
};
