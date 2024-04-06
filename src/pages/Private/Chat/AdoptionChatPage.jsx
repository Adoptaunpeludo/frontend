import { Avatar, Card, CardBody, Spinner } from '@nextui-org/react';

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

import { IconArrowBadgeRight, IconUserFilled } from '@tabler/icons-react';
import { useQueryClient } from '@tanstack/react-query';
import { TitleSection } from '../../../components';
import { BUCKET_URL } from '../../../config/config';
import { useScroll } from '../../../hooks/useScroll';
import { mapUserChatHistory } from '../../../utils/mapUserChatHistory';
import { useUserChats, userChatsQuery } from '../Shelters/useUserChats';

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
  }, [chat]);

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
    <main className="bg-default-100 flex-grow ">
      <section
        id="chats"
        className="max-w-screen-xl w-full flex  flex-col justify-center  h-full  py-12  mx-auto gap-5"
      >
        <TitleSection title={chat} />
      </section>
      <section
        id="central"
        className="max-w-screen-xl mx-auto flex  flex-col sm:flex-row"
      >
        <aside className="flex flex-col gap-2 mb-5 max-sm:px-5 sm:max-w-72  order-2 sm:order-1">
          {chats.map((chat) => (
            <NavLink
              key={chat.slug}
              to={`/private/chat/${chat.slug}`}
              onClick={() => handleCreateChat(chat.slug)}
              className="bg-primary bg-opacity-50 rounded-xl"
            >
              <Card className="flex justify-between gap-1 bg-transparent flex-row">
                <CardBody className=" flex flex-start flex-row gap-2 items-center">
                  <Avatar
                    src={`${BUCKET_URL}/${
                      chat.animal[0]?.images[0]
                        ? chat.animal[0]?.images[0]
                        : chat.users[0].avatar[0]
                    }`}
                    className="min-w-10"
                    fallback={<IconUserFilled />}
                    showFallback
                  />
                  <div className="flex flex-col  w-full sm:w-36">
                    <span className="font-poppins font-semibold text-sm line-clamp-1">{`${
                      chat.animal[0] !== undefined
                        ? chat.animal[0].name.toUpperCase()
                        : ''
                    }`}</span>
                    <span
                      className={`${
                        chat.animal[0] === undefined
                          ? 'font-poppins font-semibold text-sm line-clamp-1'
                          : 'font-poppins text-sm line-clamp-1'
                      }`}
                    >{`${chat.users[0].username}`}</span>
                  </div>

                  <span className="flex items-center  h-full w-1/6">
                    <IconArrowBadgeRight
                      size={50}
                      stroke={1}
                      className="stroke-tertiary"
                    />
                  </span>
                </CardBody>
              </Card>
            </NavLink>
          ))}
        </aside>
        <main className="order-1 sm:order-2 w-full px-5 pb-5">
          <div className="flex flex-col flex-1 background-panel rounded-xl h-156 overflow-y-hidden">
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
      </section>
    </main>
  );
};

export default AdoptionChatPage;
