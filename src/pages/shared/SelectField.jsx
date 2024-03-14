import { Select, SelectItem } from '@nextui-org/react';

export const SelectField = ({ label, dataField, dataEnum, className }) => {
  return (
    <Select
      className={className}
      label={label}
      name={dataField}
      placeholder={
        dataField === '' || dataField === null ? 'Seleccionar...' : ''
      }
      defaultSelectedKeys={
        dataField !== '' && dataField !== null && [dataField]
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
