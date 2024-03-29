import { LogoPortrait } from './LogoPortrait';

export const LogoHeader = ({ className, size }) => {
  return (
    <div id="logo" className={`${className}`}>
      <LogoPortrait size={size} />
    </div>
  );
};
