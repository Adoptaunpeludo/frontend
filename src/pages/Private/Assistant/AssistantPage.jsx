import { Spinner } from '@nextui-org/react';
import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';

import { useScroll } from '../../../hooks/useScroll';
import { mapChatHistory } from '../../../utils/mapChatHistory';

import GptMessage from './components/GptMessage';
import TextMessageBox from './components/TextMessageBox';
import UserMessage from './components/UserMessage';

import { useChatHistory } from './useChatHistory';
import { useUser } from '../useUser';
import { chatStreamGenerator } from './service';

const AssistantPage = () => {
  const { data: user } = useUser();
  const [messages, setMessages] = useState([]);
  const [isAnswering, setIsAnswering] = useState(false);
  const [isFirstLoad, setIsFirstLoad] = useState(false);
  const { data: chatHistory, isFetching } = useChatHistory(user.username);
  const { messagesEndRef } = useScroll(messages, isFirstLoad, isFetching);
  const navigate = useNavigate();

  useEffect(() => {
    if (chatHistory) {
      const history = mapChatHistory(chatHistory);
      setMessages(history);
    }
  }, [chatHistory]);

  useEffect(() => {
    setIsFirstLoad(true);

    return () => setIsFirstLoad(false);
  }, []);

  const handleDeleteMessages = () => {
    setMessages([]);
  };

  const handlePost = async (text) => {
    setIsFirstLoad(false);
    setMessages((prev) => [...prev, { text, isGpt: false }]);

    try {
      setIsAnswering(true);
      const stream = chatStreamGenerator(
        {
          question: text,
        },
        user.wsToken
      );

      setMessages((prev) => [...prev, { text: '', isGpt: true }]);

      for await (const chunk of stream) {
        setMessages((prev) => {
          const newMessages = [...prev];
          newMessages[newMessages.length - 1].text = chunk;
          return newMessages;
        });
      }
      setIsAnswering(false);
    } catch (error) {
      toast.info('El servicio de asistente no está disponible actualmente');
      setIsAnswering(false);
      return navigate('/');
    }
  };

  return (
    <main className="max-w-screen-xl  w-full flex  flex-col justify-center  mx-auto  overflow-hidden h-[86.4vh] md:flex-auto ">
      <div className="flex flex-col flex-1 background-panel rounded-xl h-156 overflow-y-hidden mx-10 my-10">
        <div className="flex flex-col flex-1 overflow-x-auto mb-4 ">
          {isFetching ? (
            <Spinner className="self-center flex-1" />
          ) : (
            <div className="grid grid-cols-12 gap-y-2">
              <GptMessage
                text={`¡Hola! Mi nombre es Neddry... ¡y pa ti mi cola!, ¿Qué necesitas saber sobre adoptaunpeludo.com?`}
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
            isDisabled={isAnswering}
            disableCorrections
          />
        </div>
      </div>
    </main>
  );
};

export default AssistantPage;
