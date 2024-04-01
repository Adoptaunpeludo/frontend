import { Button } from '@nextui-org/react';
import { H2Title } from '.';
import { ChatIcon } from '../assets/svg';
import { useUser } from '../pages/Private/useUser';
import { useNavigate } from 'react-router-dom';

import { useWebSocketContext } from '../context/WebSocketContext';
import { useState } from 'react';
import { createChat } from '../pages/Public/Animals/service';
import { toast } from 'react-toastify';

export const ContactShelter = ({ className, slug, username }) => {
  const { data: user } = useUser();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const { send, isReady } = useWebSocketContext();
  const navigate = useNavigate();

  const handleCreateChat = async () => {
    const room = slug
      ? `${slug}-${user?.username}`
      : `${username}-chat-${user?.username}`;

    try {
      setIsSubmitting(true);
      await createChat(room);
      if (isReady) {
        send(
          JSON.stringify({
            type: 'create-chat-room',
            room,
          })
        );
      }
      setIsSubmitting(false);
      navigate(`/private/chat/${room}`);
    } catch (error) {
      toast.error(error.message);
    }
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
        isLoading={isSubmitting}
        onClick={handleCreateChat}
      >
        <ChatIcon className="size-14" />
      </Button>
    </section>
  );
};
