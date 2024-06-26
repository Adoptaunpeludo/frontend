import PropTypes from 'prop-types';

export const TitleSection = ({ title, className }) => {
  return (
    <header
      className={`  border-solid border-t-1 border-b-1 border-t-primary border-b-primary py-8 h-100 ${className}`}
    >
      <h1 className="font-lobster text-2xl md:text-7xl flex justify-center text-center break-words break-all">
        {title}
      </h1>
    </header>
  );
};

TitleSection.propTypes = {
  title: PropTypes.string.isRequired,
};
