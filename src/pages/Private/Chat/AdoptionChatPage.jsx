import { Spinner, User } from '@nextui-org/react';

import {
  NavLink,
  useLoaderData,
  useNavigate,
  useParams,
} from 'react-router-dom';
import { useWebSocketContext } from '../../../context/WebSocketContext';
import TextMessageBox from '../Assistant/components/TextMessageBox';
import { useUser, userQuery } from '../useUser';
import UserMessage from './components/UserMessage';

import { useEffect, useState } from 'react';
import { receiverDataQuery } from './useReceiverData';
import { chatHistoryQuery, useChatHistory } from './useUserChatHistory';

import { useScroll } from '../../../hooks/useScroll';
import { mapUserChatHistory } from '../../../utils/mapUserChatHistory';
import { useUserChats, userChatsQuery } from '../Shelters/useUserChats';
import { BUCKET_URL } from '../../../config/config';
import { useQueryClient } from '@tanstack/react-query';

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

      const chats = await queryClient.ensureQueryData(
        userChatsQuery(sender.username)
      );

      return { history, receiver, chats, sender };
    } catch (error) {
      console.log(error);
      throw error;
    }
  };

const AdoptionChatPage = () => {
  const queryClient = useQueryClient();
  const params = useParams();
  const { chat } = params;
  const parts = chat.split('-');
  const shelter = parts.at(0);
  const adopter = parts.at(-1);
  const { receiver, sender } = useLoaderData();
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
  const { data: chats } = useUserChats(sender.username);

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
            { text: message.message, isSender: false, isRead: message.isRead },
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
          receiverUserId: receiver.id,
        })
      );
    }
  };

  const handleCreateChat = (slug) => {
    if (isReady) {
      queryClient.invalidateQueries({
        queryKey: ['user-chats', sender.username],
      });
      send(
        JSON.stringify({
          type: 'create-chat-room',
          room: slug,
        })
      );
    }
    navigate(`/private/chat/${slug}`);
  };

  return (
    <main className="max-w-screen-xl  w-full flex justify-center  mx-auto  overflow-hidden h-[86.4vh] md:flex-auto gap-3">
      <section className="flex flex-col items-center content-center flex-1 background-panel rounded-xl h-156 overflow-y-hidden my-10 max-w-52 p-4 gap-3">
        {chats.map((chat) => (
          <NavLink
            key={chat.slug}
            to={`/private/chat/${chat.slug}`}
            onClick={() => handleCreateChat(chat.slug)}
            className="self-start w-full"
          >
            <User
              name={
                chat.animal[0]?.name
                  ? `${chat.animal[0].name.toUpperCase()}/${
                      chat.users[0]?.username
                    }`
                  : `${chat.users[0].username}`
              }
              avatarProps={{
                src: `${BUCKET_URL}/${
                  chat.animal[0]?.images[0]
                    ? chat.animal[0]?.images[0]
                    : chat.users[0].avatar[0]
                }`,
                isBordered: true,
                color: 'success',
              }}
            />
          </NavLink>
        ))}
      </section>
      <div className="flex flex-col flex-1 background-panel rounded-xl h-156 overflow-y-hidden mx-10 my-10">
        <div className="flex flex-col flex-1 overflow-x-auto mb-4">
          {isFetchingUser || isFetchingChatHistory ? (
            <Spinner className="self-center flex-1 flex-col sm:w-3.5" />
          ) : (
            <div className="grid grid-cols-12 gap-y-2">
              {chatMessages.map((message, index) =>
                !message.isSender ? (
                  <UserMessage
                    key={index}
                    text={message.text}
                    isSender={message.isSender}
                    user={receiver.username}
                    isRead={message.isRead}
                    avatar={
                      message.isSender ? user.avatar : receiver?.avatar[0]
                    }
                  />
                ) : (
                  <UserMessage
                    key={index}
                    text={message.text}
                    isSender={message.isSender}
                    isRead={message.isRead}
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
