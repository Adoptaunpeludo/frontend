import PropTypes from 'prop-types';

export function H4Title({ title }) {
  return (
    <h4 className={`${className} font-poppins text-base font-medium mx-3`}>
      {title}
    </h4>
  );
}

H4Title.propTypes = {
  title: PropTypes.string.isRequired
};
