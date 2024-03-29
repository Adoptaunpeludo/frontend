import { Spinner } from '@nextui-org/react';

import { useUser } from '../useUser';
import { useWebSocketContext } from '../../../context/WebSocketContext';
import UserMessage from './components/UserMessage';
import { useNavigate, useParams } from 'react-router-dom';
import TextMessageBox from '../Assistant/components/TextMessageBox';

import { useEffect } from 'react';
import { useAdoptionChatContext } from '../../../context/AdoptionChatContext';
import { toast } from 'react-toastify';
import { currentChatQuery, useCurrentChat } from './useCurrentChat';

export const loader =
  (queryClient) =>
  async ({ params }) => {
    try {
      const chat = await queryClient.ensureQueryData(
        currentChatQuery(params.chat)
      );

      return { chat };
    } catch (error) {
      console.log(error);
      throw error;
    }
  };

const AdoptionChatPage = () => {
  // const { data: user } = useUser();
  const params = useParams();
  const { chat } = params;
  const { chatMessages, setChatMessages } = useAdoptionChatContext();
  const { socket } = useWebSocketContext();
  const { setRoom } = useAdoptionChatContext();
  const { data: user, isFetching: isFetchingUser } = useUser();
  const { data: currentChat, isFetching: isFetchingCurrentChat } =
    useCurrentChat(chat);
  const navigate = useNavigate();

  const parts = chat.split('-');

  const shelter = parts.at(0);
  const adopter = parts.at(-1);
  // const [isFirstLoad, setIsFirstLoad] = useState([]);
  // const { data: chatHistory, isFetching } = useChatHistory(user.username);
  // const { messagesEndRef } = useScroll(messages, isFirstLoad, isFetching);

  // useEffect(() => {
  //   if (chatHistory) {
  //     const history = mapChatHistory(chatHistory);
  //     setChatMessages(history);
  //   }
  // }, [chatHistory]);

  // useEffect(() => {
  //   setIsFirstLoad(true);
  // }, []);

  useEffect(() => {
    setRoom(chat);

    return () => setRoom('');
  }, [chat, setRoom, user]);

  useEffect(() => {
    setChatMessages([]);
  }, [chat, setChatMessages]);

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

    if (socket && socket.readyState !== 0)
      socket.send(
        JSON.stringify({
          type: 'chat-message',
          message: text,
          room: chat,
          username: user.username,
        })
      );
  };

  return (
    <main className="max-w-screen-xl  w-full flex  flex-col justify-center  gap-12    mx-auto  overflow-hidden h-[88vh]">
      <div className="flex flex-col flex-1 background-panel rounded-xl h-156 overflow-y-hidden mx-10 my-10">
        <div className="flex flex-col flex-1 overflow-x-auto mb-4">
          {isFetchingUser || isFetchingCurrentChat ? (
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
                      message.isSender
                        ? user.avatar
                        : currentChat.users[0].avatar[0]
                    }
                  />
                ) : (
                  <UserMessage
                    key={index}
                    text={message.text}
                    isSender={message.isSender}
                    avatar={
                      message.isSender
                        ? user.avatar
                        : currentChat.users[0].avatar[0]
                    }
                  />
                )
              )}

              {/* <div ref={messagesEndRef} /> */}
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
