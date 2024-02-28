import LogoPortrait from '../../assets/logos/LogoPortrait.svg?react';
const LogoHeader = () => {
  return (
    <div id='logo' className='h-40 w-max mx-auto '>
      {<LogoPortrait />}
    </div>
  );
};
export default LogoHeader;
