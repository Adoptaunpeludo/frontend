import { IconUser } from '@tabler/icons-react';
import { Link } from 'react-router-dom';
import { Copyright } from './components/Copyright';

const Footer = () => {
  return (
    <div className=" h-10 w-full bg-primary">
      <div className="max-w-screen-lg w-full mx-auto flex justify-between items-center ">
        <div id="DevelopedBy" className="">
          <Copyright className="w-60" />
        </div>
        <div id="SocialIcons" className="flex justify-center items-center mr-8">
          <IconUser />
          <Link to={'/about'}>Conócenos</Link>
        </div>
      </div>
    </div>
  );
};
export default Footer;
