import { IconMessages } from '@tabler/icons-react';
import { H2Title } from '../../../components';
export const ContactShelter = () => {
  return (
    <section id='talk-to-shelters' className='flex items-center '>
      <H2Title
        title='habla con la protectora'
        className='text-secondary max-sm:w-48'
      />
      <IconMessages className=' stroke-slate-100 fill-black size-14' />
    </section>
  );
};
