import { AsideDataField } from './AsideDataField';

export const AsideDataColumn = ({ dataColumn }) => {
  return dataColumn.map((data, index) => (
    <AsideDataField
      key={index}
      fieldName={data.fieldName}
      fieldValue={data.value}
    />
  ));
};
