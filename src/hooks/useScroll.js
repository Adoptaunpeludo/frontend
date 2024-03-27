import { useEffect, useRef } from 'react';

export const useScroll = (messages, isFirstLoad) => {
  const messagesEndRef = useRef(null);

  const scrollToBottom = (type) => {
    console.log({ type });
    messagesEndRef.current?.scrollIntoView({ behavior: type });
  };

  useEffect(() => {
    if (!isFirstLoad) scrollToBottom('smooth');
  }, [messages, isFirstLoad]);

  useEffect(() => {
    if (isFirstLoad) {
      scrollToBottom('instant');
    }
  }, [isFirstLoad]);

  return { messagesEndRef };
};
