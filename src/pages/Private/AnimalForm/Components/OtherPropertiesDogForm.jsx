import {
  boolDataEnum,
  energyEnum,
  moltingEnum,
  potentialEnum
} from '../../../../utils/enumData';
import { H3Title, SelectField } from '../../../shared';

const OtherPropertiesDogForm = ({ data }) => {
  const {
    easyTrain,
    energyLevel,
    moltingAmount,
    droolingPotential,
    bark,
    departmentAdapted
  } = data;
  return (
    <div className='flex flex-col gap-2'>
      <H3Title title='Otras Características' />
      <div className='flex w-full flex-wrap md:flex-nowrap gap-2 border-primary border-t-1 pt-3'>
        <SelectField
          label='Fácil de entrenar'
          className=''
          dataField={easyTrain}
          dataEnum={boolDataEnum}
        />
        <SelectField
          label='Cantidad de muda'
          className=''
          dataField={moltingAmount}
          dataEnum={moltingEnum}
        />
        <SelectField
          label='Nivel de energía'
          className=''
          dataField={energyLevel}
          dataEnum={energyEnum}
        />
      </div>
      <div className='flex w-full flex-wrap md:flex-nowrap gap-2 border-primary border-t-1 pt-3'>
        <SelectField
          label='Potencial de Babeo'
          className=''
          dataField={droolingPotential}
          dataEnum={potentialEnum}
        />
        <SelectField
          label='Tendencia a ladrar'
          className=''
          dataField={bark}
          dataEnum={potentialEnum}
        />
        <SelectField
          label='Acostumbrado a un piso'
          className=''
          dataField={departmentAdapted}
          dataEnum={boolDataEnum}
        />
      </div>
    </div>
  );
};
export default OtherPropertiesDogForm;
