import {
  IconBrandFacebook,
  IconBrandInstagram,
  IconBrandX
} from '@tabler/icons-react';
import { H2Title } from '../../../components';
export const ShareSocialMedia = () => {
  return (
    <section id='share-rrss' className='flex items-center justify-start'>
      <H2Title title='compárteme' className='text-secondary' />
      <IconBrandInstagram className='size-12' />
      <IconBrandFacebook className='size-12' />
      <IconBrandX className='size-12' />
    </section>
  );
};
