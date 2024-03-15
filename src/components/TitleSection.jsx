import PropTypes from 'prop-types';

export const TitleSection = ({ title, className }) => {
  return (
    <header
      className={` ${className} border-solid border-t-1 border-b-1 border-t-primary border-b-primary py-8 h-100 `}
    >
      <h1
        className='font-lobster text-7xl flex justify-center text-center'
        name='Rescates Peludos'
      >
        {title}
      </h1>
    </header>
  );
};

TitleSection.propTypes = {
  title: PropTypes.string.isRequired
};
