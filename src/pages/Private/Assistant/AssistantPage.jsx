import { Spinner } from '@nextui-org/react';
import { useEffect, useState } from 'react';
import { useLoaderData } from 'react-router-dom';
import { toast } from 'react-toastify';
import { useScroll } from '../../../hooks/useScroll';
import { mapChatHistory } from '../../../utils/mapChatHistory';
import GptMessage from './components/GptMessage';
import TextMessageBox from './components/TextMessageBox';
import UserMessage from './components/UserMessage';
import { chatStreamGenerator } from './service';
import { chatHistoryQuery, useChatHistory } from './useChatHistory';

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
    <main className="max-w-screen-xl  w-full flex  flex-col justify-center  gap-12    mx-auto  overflow-hidden h-[88vh]">
      <div className="flex flex-col flex-1 background-panel rounded-xl h-156 overflow-y-hidden mx-10 my-10">
        <div className="flex flex-col flex-1 overflow-x-auto mb-4 ">
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

        <div className="bg-white">
          <TextMessageBox
            onSendMessage={handlePost}
            onDeleteMessages={handleDeleteMessages}
            placeholder="Escribe aquí tu pregunta"
            disableCorrections
          />
        </div>
      </div>
    </main>
  );
};

export default AssistantPage;
