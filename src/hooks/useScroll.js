import { useEffect, useRef } from 'react';

export const useScroll = (messages, isFirstLoad, isFetching) => {
  const messagesEndRef = useRef(null);

  const scrollToBottom = (type) => {
    console.log({ type });
    messagesEndRef.current?.scrollIntoView({ behavior: type });
  };

  useEffect(() => {
    console.log('smooth');
    if (!isFirstLoad) scrollToBottom('smooth');
  }, [messages, isFirstLoad]);

  useEffect(() => {
    console.log('instant');
    if (isFirstLoad && !isFetching) {
      scrollToBottom('instant');
    }
  }, [isFirstLoad, isFetching]);

  return { messagesEndRef };
};
