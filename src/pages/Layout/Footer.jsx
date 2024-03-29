import {
  IconBrandFacebook,
  IconBrandInstagram,
  IconBrandX,
} from '@tabler/icons-react';
import { Copyright } from './components/Copyright';

const Footer = () => {
  return (
    <div className=" h-10 w-full bg-primary">
      <div className="max-w-screen-lg w-full mx-auto flex justify-between items-center ">
        <div id="DevelopedBy" className="">
          <Copyright className="w-60" />
        </div>
        <div id="SocialIcons" className="flex justify-center ">
          <IconBrandX className="max-h-9" />
          <IconBrandInstagram className="max-h-9" />
          <IconBrandFacebook className="max-h-9" />
        </div>
      </div>
    </div>
  );
};
export default Footer;
