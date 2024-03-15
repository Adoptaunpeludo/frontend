import PropTypes from 'prop-types';

export function H3Title({ title, className }) {
  return (
    <h3 className={` ${className} font-poppins text-base font-semibold`}>
      {title}
    </h3>
  );
}

H3Title.propTypes = {
  title: PropTypes.string.isRequired
};
