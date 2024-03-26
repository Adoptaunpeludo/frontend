import { useEffect, useState } from 'react';
import { useLoaderData } from 'react-router-dom';
import { toast } from 'react-toastify';
import { Spinner } from '@nextui-org/react';
import GptMessage from './components/GptMessage';
import UserMessage from './components/UserMessage';
import TextMessageBox from './components/TextMessageBox';
import { chatHistoryQuery, useChatHistory } from './useChatHistory';
import { useScroll } from '../../../hooks/useScroll';
import { chatStreamGenerator } from './service';
import { mapChatHistory } from '../../../utils/mapChatHistory';

export const loader =
  (queryClient) =>
  async ({ params }) => {
    const { username } = params;

    if (!username) return null;

    try {
      await queryClient.ensureQueryData(chatHistoryQuery(username));

      return username;
    } catch (error) {
      console.log(error);
      throw error;
    }
  };

const AssistantPage = () => {
  const username = useLoaderData();
  const [messages, setMessages] = useState([]);
  const { data: chatHistory, isFetching } = useChatHistory(username);
  const { messagesEndRef } = useScroll(messages, isFetching);

  useEffect(() => {
    if (chatHistory?.history) {
      const history = mapChatHistory(chatHistory.history);
      setMessages(history);
    }
  }, [chatHistory]);

  const handleDeleteMessages = () => {
    setMessages([]);
  };

  const handlePost = async (text) => {
    setMessages((prev) => [...prev, { text, isGpt: false }]);

    try {
      const stream = chatStreamGenerator(
        {
          question: text,
        },
        'chat/user-question'
      );

      setMessages((prev) => [...prev, { text: '', isGpt: true }]);

      for await (const chunk of stream) {
        setMessages((prev) => {
          const newMessages = [...prev];
          newMessages[newMessages.length - 1].text = chunk;
          return newMessages;
        });
      }
    } catch (error) {
      if (error instanceof Error) return toast.error(error.message);
      if (typeof error === 'string') return toast.error(error);
      return toast.error('Error desconocido, revise los logs');
    }
  };

  return (
    <main className="max-w-screen-xl w-full flex  flex-col justify-center  gap-12 h-full  py-12  mx-auto flex-grow">
      <div className="flex flex-col rounded-2xl flex-1 p-4 bg-primary bg-opacity-15">
        <div className="flex flex-col flex-1 overflow-x-auto mb-4 overflow-scroll">
          {isFetching ? (
            <Spinner />
          ) : (
            <div className="grid grid-cols-12 gap-y-2">
              <GptMessage
                text={`Hola! soy tu Chat Bot, ¿Qué necesitas saber sobre adoptaunpeludo.com?`}
              />
              {messages.map((message, index) =>
                message.isGpt ? (
                  <GptMessage key={index} text={message.text} />
                ) : (
                  <UserMessage key={index} text={message.text} />
                )
              )}

              <div ref={messagesEndRef} />
            </div>
          )}
        </div>

        <TextMessageBox
          onSendMessage={handlePost}
          onDeleteMessages={handleDeleteMessages}
          placeholder="Escribe aquí tu pregunta"
          disableCorrections
        />
      </div>
    </main>
  );
};

export default AssistantPage;
