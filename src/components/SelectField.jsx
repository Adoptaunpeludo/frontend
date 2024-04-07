import { Select, SelectItem } from '@nextui-org/react';

export const SelectField = ({
  label,
  dataField,
  dataEnum,
  name,
  color,
  errorMessage,
  className = '',
  isDisabled,
  isRequired,
  classNames = '',
  onChange,
}) => {
  return (
    <Select
      isRequired={isRequired}
      isDisabled={isDisabled}
      className={className}
      label={label}
      name={name}
      color={color}
      errorMessage={errorMessage}
      classNames={classNames}
      placeholder={
        dataField === '' || dataField === null ? 'Seleccionar...' : ''
      }
      defaultSelectedKeys={
        dataField !== '' && dataField !== null && [dataField?.toString()]
      }
      onChange={onChange}
    >
      {dataEnum.map(({ label, value }) => (
        <SelectItem key={value} value={value} className="capitalize">
          {label}
        </SelectItem>
      ))}
    </Select>
  );
};
