import { H2Title } from '.';
import { ChatIcon } from '../assets/svg';
export const ContactShelter = ({ className }) => {
  return (
    <section
      id="talk-to-shelters"
      className={`flex items-center ${className} `}
    >
      <H2Title
        title="habla con la protectora"
        className="text-secondary max-sm:w-48"
      />
      <ChatIcon className="size-14" />
    </section>
  );
};
