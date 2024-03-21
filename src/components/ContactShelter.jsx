import { IconMessages } from '@tabler/icons-react';
import { H2Title } from '.';
export const ContactShelter = ({ className }) => {
  return (
    <section id="talk-to-shelters" className={`flex items-center ${className}`}>
      <H2Title
        title="habla con la protectora"
        className="text-secondary max-sm:w-48"
      />
      <IconMessages className=" stroke-slate-100 fill-black size-14" />
    </section>
  );
};
