import {
  IconBrandFacebook,
  IconBrandInstagram,
  IconBrandX
} from '@tabler/icons-react';
import Copyright from '../../assets/copyright.svg?react';

const Footer = () => {
  return (
    <div className='absolute bottom-0 h-16 w-dvw bg-primary'>
      <div className='max-w-screen-lg w-full mx-auto flex justify-between items-center h-full'>
        <div id='DevelopedBy' className=''>
          <Copyright className='w-60' />
        </div>
        <div id='SocialIcons' className='flex justify-center '>
          <IconBrandX className='size-9' />
          <IconBrandInstagram className='size-9' />
          <IconBrandFacebook className='size-9' />
        </div>
      </div>
    </div>
  );
};
export default Footer;
