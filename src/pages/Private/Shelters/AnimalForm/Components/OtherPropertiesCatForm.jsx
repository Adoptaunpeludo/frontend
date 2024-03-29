import { H2Title, SelectField } from '../../../../../components';
import { selectStyleConfig } from '../../../../../utils/configFormFields';
import {
  boolDataEnum,
  energyEnum,
  moltingEnum,
  potentialEnum,
} from '../../../../../utils/enumData';

const OtherPropertiesCatForm = ({ data = {}, isDisabled }) => {
  const {
    easyTrain,
    energyLevel,
    moltingAmount,
    playLevel,
    kidsFriendly,
    scratchPotential,
    toiletTrained,
  } = data;
  return (
    <div className="flex flex-col gap-2">
      <H2Title title="Otras Características" />
      <div className="flex w-full flex-wrap md:flex-nowrap gap-2 border-primary border-t-1 pt-3">
        <SelectField
          isRequired
          label="Entrenado en el arenero"
          className=""
          name="toiletTrained"
          dataField={toiletTrained}
          dataEnum={boolDataEnum}
          isDisabled={isDisabled}
          classNames={selectStyleConfig}
        />
        <SelectField
          isRequired
          label="Fácil de entrenar"
          className=""
          name="easyTrain"
          dataField={easyTrain}
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
          label="Nivel de juego"
          className=""
          name="playLevel"
          dataField={playLevel}
          dataEnum={potentialEnum}
          isDisabled={isDisabled}
          classNames={selectStyleConfig}
        />

        <SelectField
          isRequired
          label="Tendencia a arañar"
          className=""
          name="scratchPotential"
          dataField={scratchPotential}
          dataEnum={potentialEnum}
          isDisabled={isDisabled}
          classNames={selectStyleConfig}
        />
        <SelectField
          isRequired
          label="Sociable con niños"
          className=""
          name="kidsFriendly"
          dataField={kidsFriendly}
          dataEnum={boolDataEnum}
          isDisabled={isDisabled}
          classNames={selectStyleConfig}
        />
      </div>
    </div>
  );
};
export default OtherPropertiesCatForm;
