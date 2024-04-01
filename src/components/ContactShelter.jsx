import { Button } from '@nextui-org/react';
import { H2Title } from '.';
import { ChatIcon } from '../assets/svg';
import { useUser } from '../pages/Private/useUser';
import { useNavigate } from 'react-router-dom';

import { useWebSocketContext } from '../context/WebSocketContext';

export const ContactShelter = ({ className, slug, username }) => {
  const { data: user } = useUser();
  const { send, isReady } = useWebSocketContext();
  const navigate = useNavigate();

  const handleCreateChat = () => {
    const room = slug
      ? `${slug}-${user?.username}`
      : `${username}-chat-${user?.username}`;

    console.log({ room });

    if (isReady) {
      send(
        JSON.stringify({
          type: 'create-chat-room',
          room,
        })
      );
    }

    navigate(`/private/chat/${room}`);
  };

  return (
    <section
      id="talk-to-shelters"
      className={`flex items-center ${className} `}
    >
      <H2Title
        title="habla con la protectora"
        className="text-secondary max-sm:w-48"
      />
      <Button
        isDisabled={!user || user?.role === 'shelter'}
        disableAnimation=""
        onClick={handleCreateChat}
      >
        <ChatIcon className="size-14" />
      </Button>
    </section>
  );
};
