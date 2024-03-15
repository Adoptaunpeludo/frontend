import { cities, statusPetEnum } from '../../../../utils/enumData';
import { H3Title, SelectField } from '../../../../components';

const StatusShelterForm = ({ data }) => {
  const { status, city } = data;
  return (
    <div className="flex flex-col gap-2">
      <H3Title title="Estado protectora" />
      <div className="flex w-full flex-wrap md:flex-nowrap gap-2 border-primary border-t-1 pt-3">
        <SelectField
          label="Status"
          className="min-w-72"
          name="status"
          dataField={status}
          dataEnum={statusPetEnum}
        />

        <SelectField
          label="Ciudad"
          className="min-w-72"
          name="city"
          dataField={city}
          dataEnum={cities}
        />
      </div>
    </div>
  );
};
export default StatusShelterForm;
