import { Spinner } from '@nextui-org/react';

import { useUser } from '../useUser';
import { useWebSocketContext } from '../../../context/WebSocketContext';
import UserMessage from './components/UserMessage';
import { useNavigate, useParams } from 'react-router-dom';
import { useAnimalDetails } from '../../Public/Animals/useAnimalDetails';

import TextMessageBox from '../Assistant/components/TextMessageBox';

import { useEffect } from 'react';
import { useAdoptionChatContext } from '../../../context/AdoptionChatContext';
import { toast } from 'react-toastify';

// export const loader = (queryClient) => async () => {
//   try {
//     const chat = await .....
//   } catch (error) {
//     console.log(error);
//     throw error;
//   }
// };

const AdoptionChatPage = () => {
  // const { data: user } = useUser();
  const { chatMessages, setChatMessages } = useAdoptionChatContext();
  const { socket } = useWebSocketContext();
  const { setRoom } = useAdoptionChatContext();
  const { data: user, isFetching: isFetchingUser } = useUser();
  const navigate = useNavigate();

  const params = useParams();

  const { chat } = params;

  const parts = chat.split('-');

  const slug = parts.slice(0, 2).join('-');

  const shelter = parts.at(0);
  const adopter = parts.at(-1);

  const { data: animal, isFetching: isFetchingAnimal } = useAnimalDetails(slug);
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
  }, [chat, setRoom]);

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
        <div className="flex flex-col flex-1 overflow-x-auto mb-4 ">
          {isFetchingUser || isFetchingAnimal ? (
            <Spinner className="self-center flex-1" />
          ) : (
            <div className="grid grid-cols-12 gap-y-2">
              {chatMessages.map((message, index) =>
                !message.isSender ? (
                  <UserMessage
                    key={index}
                    text={message.text}
                    isSender={message.isSender}
                    avatar={animal.user.avatar}
                  />
                ) : (
                  <UserMessage
                    key={index}
                    text={message.text}
                    isSender={message.isSender}
                    avatar={user.avatar}
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
