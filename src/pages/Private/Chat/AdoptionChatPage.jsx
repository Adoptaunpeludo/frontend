import { Spinner } from '@nextui-org/react';

import { useUser, userQuery } from '../useUser';
import { useWebSocketContext } from '../../../context/WebSocketContext';
import UserMessage from './components/UserMessage';
import { useLoaderData, useNavigate, useParams } from 'react-router-dom';
import TextMessageBox from '../Assistant/components/TextMessageBox';

import { useEffect, useState } from 'react';
import { receiverDataQuery } from './useReceiverData';
import { chatHistoryQuery, useChatHistory } from './useUserChatHistory';

import { mapUserChatHistory } from '../../../utils/mapUserChatHistory';
import { useScroll } from '../../../hooks/useScroll';

export const loader =
  (queryClient) =>
  async ({ params }) => {
    try {
      const { chat } = params;
      const parts = chat.split('-');
      const shelter = parts.at(0);
      const adopter = parts.at(-1);
      const sender = await queryClient.ensureQueryData(userQuery);
      const username = sender?.role === 'shelter' ? adopter : shelter;

      const receiver = await queryClient.ensureQueryData(
        receiverDataQuery(username)
      );

      const history = await queryClient.ensureQueryData(
        chatHistoryQuery(params.chat)
      );

      return { history, receiver };
    } catch (error) {
      console.log(error);
      throw error;
    }
  };

const AdoptionChatPage = () => {
  const params = useParams();
  const { chat } = params;
  const parts = chat.split('-');
  const shelter = parts.at(0);
  const adopter = parts.at(-1);
  const { receiver } = useLoaderData();
  const [chatMessages, setChatMessages] = useState([]);
  const { send, isReady, val } = useWebSocketContext();
  const { data: user, isFetching: isFetchingUser } = useUser();
  const { data: chatHistory, isFetching: isFetchingChatHistory } =
    useChatHistory(chat);
  const navigate = useNavigate();
  const [isFirstLoad, setIsFirstLoad] = useState(false);
  const { messagesEndRef } = useScroll(
    chatMessages,
    isFirstLoad,
    isFetchingChatHistory
  );

  useEffect(() => {
    if (chatHistory) {
      const history = mapUserChatHistory(chatHistory, user.username);
      setChatMessages(history);
    }
  }, [chatHistory, setChatMessages, user.username]);

  useEffect(() => {
    setIsFirstLoad(true);
    if (isReady) {
      send(
        JSON.stringify({
          type: 'create-chat-room',
          room: chat,
        })
      );
      send(
        JSON.stringify({
          type: 'join-chat-room',
          username: user.username,
          room: chat,
          role: user.role,
        })
      );
    }
    return () => {
      setIsFirstLoad(false);
      if (isReady) {
        send(
          JSON.stringify({
            type: 'leave-chat-room',
            username: user.username,
            room: chat,
            role: user.role,
          })
        );
      }
    };
  }, []);

  useEffect(() => {
    if (val && isReady) {
      const message = JSON.parse(val);

      if (message.type === 'chat-message')
        if (message.room === chat) {
          setChatMessages((prev) => [
            ...prev,
            { text: message.message, isSender: false },
          ]);
          setIsFirstLoad(false);
        }
    }
  }, [chat, setChatMessages, isReady, val]);

  const handleDeleteMessages = () => {
    setChatMessages([]);
  };

  if (
    !user ||
    (user.role === 'adopter' && user.username !== adopter) ||
    (user.role === 'shelter' && user.username !== shelter)
  ) {
    navigate(-1);
  }

  const handlePost = async (text) => {
    setIsFirstLoad(false);
    setChatMessages((prev) => [...prev, { text, isSender: true }]);

    if (isReady) {
      send(
        JSON.stringify({
          type: 'chat-message',
          message: text,
          room: chat,
          senderUsername: user.username,
          receiverMail: receiver.email,
          receiverUsername: receiver.username,
        })
      );
    }
  };

  return (
    <main className="max-w-screen-xl  w-full flex  flex-col justify-center  gap-12    mx-auto  overflow-hidden h-[88vh]">
      <div className="flex flex-col flex-1 background-panel rounded-xl h-156 overflow-y-hidden mx-10 my-10">
        <div className="flex flex-col flex-1 overflow-x-auto mb-4">
          {isFetchingUser || isFetchingChatHistory ? (
            <Spinner className="self-center flex-1 flex-col sm:w-3.5" />
          ) : (
            <div className="grid grid-cols-12 gap-y-2">
              {!isReady && <div>Error conectado al servidor de mensajes</div>}
              {chatMessages.map((message, index) =>
                !message.isSender ? (
                  <UserMessage
                    key={index}
                    text={message.text}
                    isSender={message.isSender}
                    avatar={
                      message.isSender ? user.avatar : receiver?.avatar[0]
                    }
                  />
                ) : (
                  <UserMessage
                    key={index}
                    text={message.text}
                    isSender={message.isSender}
                    avatar={
                      message.isSender ? user.avatar : receiver?.avatar[0]
                    }
                  />
                )
              )}
            </div>
          )}
          <div ref={messagesEndRef} />
        </div>

        <div className="bg-white">
          <TextMessageBox
            onSendMessage={handlePost}
            onDeleteMessages={handleDeleteMessages}
            placeholder="Escribe aquí tu pregunta"
            disableCorrections
            page={'adoption-chat'}
          />
        </div>
      </div>
    </main>
  );
};

export default AdoptionChatPage;
