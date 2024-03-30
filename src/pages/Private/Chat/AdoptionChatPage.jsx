import { Spinner } from '@nextui-org/react';

import { useUser } from '../useUser';
import { useWebSocketContext } from '../../../context/WebSocketContext';
import UserMessage from './components/UserMessage';
import { useNavigate, useParams } from 'react-router-dom';
import TextMessageBox from '../Assistant/components/TextMessageBox';

import { useEffect, useState } from 'react';
import { useAdoptionChatContext } from '../../../context/AdoptionChatContext';
import { toast } from 'react-toastify';
// import { currentChatQuery, useCurrentChat } from './useCurrentChat';
import { shelterDataQuery, useShelterData } from './useShelterData';
import { chatHistoryQuery, useChatHistory } from './useUserChatHistory';
import { useScroll } from 'framer-motion';
import { mapUserChatHistory } from '../../../utils/mapUserChatHistory';

export const loader =
  (queryClient) =>
  async ({ params }) => {
    try {
      const shelter = await queryClient.ensureQueryData(
        shelterDataQuery(params.chat.split('-').at(0))
      );

      const history = await queryClient.ensureQueryData(
        chatHistoryQuery(params.chat)
      );

      return { history, shelter };
    } catch (error) {
      console.log(error);
      throw error;
    }
  };

const AdoptionChatPage = () => {
  // const { data: user } = useUser();
  const params = useParams();
  const { chat } = params;
  const parts = chat.split('-');
  const shelter = parts.at(0);
  const adopter = parts.at(-1);

  const { chatMessages, setChatMessages } = useAdoptionChatContext();
  const { socket, isReady } = useWebSocketContext();
  const { data: user, isFetching: isFetchingUser } = useUser();
  const { data: shelterData, isFetching: isFetchingShelter } =
    useShelterData(shelter);
  const { data: chatHistory, isFetching: isFetchingChatHistory } =
    useChatHistory(chat);

  const navigate = useNavigate();

  const [isFirstLoad, setIsFirstLoad] = useState([]);
  const { messagesEndRef } = useScroll(
    chatMessages,
    isFirstLoad,
    isFetchingChatHistory
  );

  useEffect(() => {
    if (chatHistory) {
      const history = mapUserChatHistory(chatHistory);
      setChatMessages(history);
    }
  }, [chatHistory, setChatMessages]);

  useEffect(() => {
    setIsFirstLoad(true);
  }, []);

  useEffect(() => {
    if (isReady) {
      socket.send(
        JSON.stringify({
          type: 'join-chat-room',
          username: user.username,
          room: chat,
          role: user.role,
        })
      );
    }

    return () => {
      if (isReady) {
        socket.send(
          JSON.stringify({
            type: 'leave-chat-room',
            username: user.username,
            room: chat,
            role: user.role,
          })
        );
      }
    };
  }, [chat, socket, user, isReady]);

  useEffect(() => {
    if (socket && isReady) {
      socket.onmessage = (event) => {
        const message = JSON.parse(event.data);

        if (message.type === 'chat-message')
          if (message.room === chat)
            setChatMessages((prev) => [
              ...prev,
              { text: message.message, isSender: false },
            ]);
      };
    }
  }, [chat, setChatMessages, isReady, socket]);

  const handleDeleteMessages = () => {
    setChatMessages([]);
  };

  if (
    (user.role === 'adopter' && user.username !== adopter) ||
    (user.role === 'shelter' && user.username !== shelter)
  ) {
    toast.error('No autorizado a unirte a esta sala');
    navigate(-1);
  }

  const handlePost = async (text) => {
    // setIsFirstLoad(false);
    setChatMessages((prev) => [...prev, { text, isSender: true }]);

    if (socket && socket.readyState !== 0) {
      socket.send(
        JSON.stringify({
          type: 'chat-message',
          message: text,
          room: chat,
          username: user.username,
        })
      );
    }
  };

  return (
    <main className="max-w-screen-xl  w-full flex  flex-col justify-center  gap-12    mx-auto  overflow-hidden h-[88vh]">
      <div className="flex flex-col flex-1 background-panel rounded-xl h-156 overflow-y-hidden mx-10 my-10">
        <div className="flex flex-col flex-1 overflow-x-auto mb-4">
          {isFetchingUser || /*isFetchingCurrentChat ||*/ isFetchingShelter ? (
            <Spinner className="self-center flex-1 flex-col sm:w-3.5" />
          ) : (
            <div className="grid grid-cols-12 gap-y-2">
              {chatMessages.map((message, index) =>
                !message.isSender ? (
                  <UserMessage
                    key={index}
                    text={message.text}
                    isSender={message.isSender}
                    avatar={
                      message.isSender ? user.avatar : shelterData?.avatar[0]
                    }
                  />
                ) : (
                  <UserMessage
                    key={index}
                    text={message.text}
                    isSender={message.isSender}
                    avatar={
                      message.isSender ? user.avatar : shelterData?.avatar[0]
                    }
                  />
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

export default AdoptionChatPage;
