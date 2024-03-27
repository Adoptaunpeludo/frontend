import { Select, SelectItem } from '@nextui-org/react';

export const SelectField = ({
  label,
  dataField,
  dataEnum,
  name,
  className = '',
  isDisabled,
  isRequired,
}) => {
  return (
    <Select
      isRequired={isRequired}
      isDisabled={isDisabled}
      className={className}
      label={label}
      name={name}
      placeholder={
        dataField === '' || dataField === null ? 'Seleccionar...' : ''
      }
      defaultSelectedKeys={
        dataField !== '' && dataField !== null && [dataField?.toString()]
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
