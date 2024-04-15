import { Avatar, Badge, Skeleton } from '@nextui-org/react';

import {
  NavLink,
  useLoaderData,
  useNavigate,
  useNavigation,
  useParams,
} from 'react-router-dom';
import { useWebSocketContext } from '../../../context/WebSocketContext';
import TextMessageBox from '../Assistant/components/TextMessageBox';
import { useUser } from '../useUser';
import UserMessage from './components/UserMessage';

import { useEffect, useState } from 'react';
import { useChatHistory } from './useUserChatHistory';

import { IconArrowBadgeRight, IconUserFilled } from '@tabler/icons-react';
import { useQueryClient } from '@tanstack/react-query';
import { TitleSection } from '../../../components';
import { BUCKET_URL } from '../../../config/config';
import { useScroll } from '../../../hooks/useScroll';
import { mapUserChatHistory } from '../../../utils/mapUserChatHistory';
import { useUserChats } from '../Shelters/useUserChats';

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
  const { data: user } = useUser();
  const { data: chatHistory, isFetching: isFetchingChatHistory } =
    useChatHistory(chat);
  const navigate = useNavigate();
  const [isFirstLoad, setIsFirstLoad] = useState(false);
  const navigation = useNavigation();
  const isLoading = navigation.state === 'loading';
  const { messagesEndRef } = useScroll(
    chatMessages,
    isFirstLoad,
    isFetchingChatHistory || isLoading
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
          senderUsername: receiver.username,
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
            {
              text: message.message,
              isSender: false,
              isRead: message.isRead,
              date: message.createdAt,
            },
          ]);
          setIsFirstLoad(false);
        }
      if (message.type === 'message-readd')
        queryClient.invalidateQueries({
          queryKey: ['chat-history', message.room],
        });
    }
  }, [chat, setChatMessages, isReady, val, queryClient]);

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
    setChatMessages((prev) => [
      ...prev,
      { text, isSender: true, date: new Date() },
    ]);
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
        <TitleSection title={chat} className=" line-clamp-3 break-words" />
      </section>
      <section
        id="central"
        className="max-w-screen-xl mx-auto flex  flex-col sm:flex-row"
      >
        <aside className="flex flex-col gap-4 mb-5 max-sm:px-5 sm:w-128  order-2 sm:order-1 mx-1 sm:overflow-y-scroll pt-2 sm:h-132">
          {chats.map((chat) => (
            <NavLink
              key={chat.slug}
              to={`/private/chat/${chat.slug}`}
              onClick={() => handleCreateChat(chat.slug)}
              className={`${
                !chat.users[0]?.username && 'hidden'
              } bg-primary bg-opacity-50 rounded-xl flex sm:max-w-72`}
            >
              <Badge
                content={chat._count.messages}
                size="lg"
                color="primary"
                placement="top-right"
                // isInvisible={isFetchingNotifications}
                className="sm:mr-5"
              >
                <div className=" flex flex-row gap-2 justify-evenly h-20 max-sm:w-[90dvw] chat-button ">
                  <section className="flex items-center pl-5 max-w-16">
                    <Avatar
                      src={`${BUCKET_URL}/${
                        chat.animal[0]?.images[0]
                          ? chat.animal[0]?.images[0]
                          : chat.users[0]?.avatar[0]
                      }`}
                      className="min-w-10 "
                      fallback={<IconUserFilled />}
                      showFallback
                    />
                  </section>
                  <section className="flex items-center w-full flex-grow">
                    <div className="flex flex-col w-full sm:w-32">
                      <span className="font-poppins font-semibold text-sm line-clamp-1 break-all w-full">{`${
                        chat.animal[0] !== undefined
                          ? chat.animal[0]?.name.toUpperCase()
                          : ''
                      }`}</span>
                      <span
                        className={`${
                          chat.animal[0] === undefined
                            ? 'font-poppins font-semibold text-sm line-clamp-1'
                            : 'font-poppins text-sm line-clamp-1'
                        }`}
                      >{`${chat.users[0]?.username}`}</span>
                    </div>
                  </section>
                  <section className="flex items-center justify-end h-full mr-10">
                    <IconArrowBadgeRight
                      size={50}
                      stroke={1}
                      className="stroke-tertiary"
                    />
                  </section>
                </div>
              </Badge>
            </NavLink>
          ))}
        </aside>
        <main className="order-1 sm:order-2 w-full px-5 pb-5">
          <Skeleton
            className="flex flex-col flex-1 overflow-x-auto mb-4"
            isLoaded={!isLoading}
          >
            <div className="flex flex-col flex-1 background-panel rounded-xl h-132 overflow-y-hidden">
              <div className="flex flex-col flex-1 overflow-x-auto mb-4">
                <div className="grid grid-cols-12 gap-y-2">
                  {chatMessages.map((message, index) =>
                    !message.isSender ? (
                      <UserMessage
                        key={index}
                        text={message.text}
                        isSender={message.isSender}
                        user={receiver.username}
                        isRead={message.isRead}
                        date={message.date}
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
                        date={message.date}
                        avatar={
                          message.isSender ? user.avatar : receiver?.avatar[0]
                        }
                      />
                    )
                  )}
                </div>

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
          </Skeleton>
        </main>
      </section>
    </main>
  );
};

export default AdoptionChatPage;
