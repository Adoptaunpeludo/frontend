import { IconUser } from '@tabler/icons-react';
import { Copyright } from './components/Copyright';
import { Link } from 'react-router-dom';

const Footer = () => {
  return (
    <div className=" h-10 w-full bg-primary">
      <div className="max-w-screen-lg w-full mx-auto flex justify-between items-center ">
        <div id="DevelopedBy" className="">
          <Copyright className="w-60" />
        </div>
        <div id="SocialIcons" className="flex justify-center items-center">
          <IconUser />
          <Link to={'/about'}>Conócenos</Link>
        </div>
      </div>
    </div>
  );
};
export default Footer;
