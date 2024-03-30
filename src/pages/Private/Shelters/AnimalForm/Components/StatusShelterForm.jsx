import { H2Title, SelectField } from '../../../../../components';
import { selectStyleConfig } from '../../../../../utils/configFormFields';
import { cities, statusPetEnum } from '../../../../../utils/enumData';

const StatusShelterForm = ({ data = {}, isDisabled }) => {
  const { status, city } = data;
  return (
    <div className="flex flex-col gap-2">
      <H2Title title="Estado protectora" />
      <div className="flex w-full flex-wrap md:flex-nowrap gap-2 border-primary border-t-1 pt-3">
        <SelectField
          isRequired
          label="Status"
          className="min-w-72"
          name="status"
          dataField={status}
          dataEnum={statusPetEnum}
          isDisabled={isDisabled}
          classNames={selectStyleConfig}
        />

        <SelectField
          isRequired
          label="Ciudad"
          className="min-w-72"
          name="city"
          dataField={city}
          dataEnum={cities}
          isDisabled={isDisabled}
          classNames={selectStyleConfig}
        />
      </div>
    </div>
  );
};
export default StatusShelterForm;
