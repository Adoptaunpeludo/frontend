import PropTypes from 'prop-types';

export function H2Title({ title, className }) {
  return (
    <h2 className={`${className} font-poppins text-2xl font-semibold mx-2`}>
      {title}
    </h2>
  );
}

H2Title.propTypes = {
  title: PropTypes.string.isRequired
};
