import { Select, SelectItem } from '@nextui-org/react';
import { PropTypes } from 'prop-types';

export const SelectField = ({
  label,
  dataField,
  dataEnum,
  name,
  className = ''
}) => {
  return (
    <Select
      className={className}
      label={label}
      name={name}
      placeholder={
        dataField === '' || dataField === null ? 'Seleccionar...' : ''
      }
      defaultSelectedKeys={
        dataField !== '' && dataField !== null && [dataField.toString()]
      }
    >
      {dataEnum.map(({ label, value }) => (
        <SelectItem key={value} value={value}>
          {label}
        </SelectItem>
      ))}
    </Select>
  );
};

SelectField.propTypes = {
  label: PropTypes.string.isRequired,
  dataField: PropTypes.oneOfType([PropTypes.string, PropTypes.bool]).isRequired,
  dataEnum: PropTypes.array.isRequired,
  name: PropTypes.string.isRequired
};
