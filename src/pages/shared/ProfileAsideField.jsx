import PropTypes from 'prop-types';
export function ProfileAsideField({ fieldName, fieldValue }) {
  return (
    <div className='flex justify-between border-solid border-b-1 border-b-primary mx-2 pb-1'>
      <span>{fieldName}</span>
      <span>{fieldValue}</span>
    </div>
  );
}

ProfileAsideField.propTypes = {
  fieldName: PropTypes.string.isRequired,
  fieldValue: PropTypes.string
};
