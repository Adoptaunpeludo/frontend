import { Button } from '@nextui-org/react';
import { H2Title } from '.';
import { ChatIcon } from '../assets/svg';
import { useUser } from '../pages/Private/useUser';
import { useNavigate } from 'react-router-dom';
export const ContactShelter = ({ className, slug }) => {
  const { data: user } = useUser();
  const navigate = useNavigate();

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
        onClick={() => navigate(`/private/chat/${slug}-${user?.username}`)}
      >
        <ChatIcon className="size-14" />
      </Button>
    </section>
  );
};
