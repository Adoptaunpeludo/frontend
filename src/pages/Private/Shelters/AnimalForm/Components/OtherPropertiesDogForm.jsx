import { H2Title, SelectField } from '../../../../../components';
import { selectStyleConfig } from '../../../../../utils/configFormFields';
import {
  boolDataEnum,
  energyEnum,
  moltingEnum,
  potentialEnum,
} from '../../../../../utils/enumData';

const OtherPropertiesDogForm = ({ data = {}, isDisabled }) => {
  const {
    easyTrain,
    energyLevel,
    moltingAmount,
    droolingPotential,
    bark,
    departmentAdapted,
  } = data;
  return (
    <div className="flex flex-col gap-2">
      <H2Title title="Otras Características" />
      <div className="flex w-full flex-wrap md:flex-nowrap gap-2 border-primary border-t-1 pt-3">
        <SelectField
          isRequired
          label="Fácil de entrenar"
          className=""
          dataField={easyTrain}
          name="easyTrain"
          dataEnum={boolDataEnum}
          isDisabled={isDisabled}
          classNames={selectStyleConfig}
        />
        <SelectField
          isRequired
          label="Cantidad de muda"
          className=""
          name="moltingAmount"
          dataField={moltingAmount}
          dataEnum={moltingEnum}
          isDisabled={isDisabled}
          classNames={selectStyleConfig}
        />
        <SelectField
          isRequired
          label="Nivel de energía"
          className=""
          name="energyLevel"
          dataField={energyLevel}
          dataEnum={energyEnum}
          isDisabled={isDisabled}
          classNames={selectStyleConfig}
        />
      </div>
      <div className="flex w-full flex-wrap md:flex-nowrap gap-2 pt-3">
        <SelectField
          isRequired
          label="Potencial de Babeo"
          className=""
          name="droolingPotential"
          dataField={droolingPotential}
          dataEnum={potentialEnum}
          isDisabled={isDisabled}
          classNames={selectStyleConfig}
        />
        <SelectField
          isRequired
          label="Tendencia a ladrar"
          className=""
          name="bark"
          dataField={bark}
          dataEnum={potentialEnum}
          isDisabled={isDisabled}
          classNames={selectStyleConfig}
        />
        <SelectField
          isRequired
          label="Acostumbrado a un piso"
          className=""
          name="departmentAdapted"
          dataField={departmentAdapted}
          dataEnum={boolDataEnum}
          isDisabled={isDisabled}
          classNames={selectStyleConfig}
        />
      </div>
    </div>
  );
};
export default OtherPropertiesDogForm;
