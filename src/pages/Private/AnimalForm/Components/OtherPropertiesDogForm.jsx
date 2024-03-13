import { Input } from '@nextui-org/react';
import { H3Title } from '../../../shared';

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
        <Input
          className=''
          type='text'
          label='Facil de entrenar'
          name='easyTrain'
          placeholder={easyTrain === '' ? '' : easyTrain}
        />

        <Input
          className=' '
          type='text'
          label='Nivel de energía'
          name='energyLevel'
          placeholder={energyLevel === '' ? '' : energyLevel}
        />
        <Input
          className=''
          type='text'
          label='Cantidad de muda'
          name='moltingAmount'
          placeholder={moltingAmount === '' ? '' : moltingAmount}
        />
      </div>
      <div className='flex w-full flex-wrap md:flex-nowrap gap-2 border-primary border-t-1 pt-3'>
        <Input
          className=''
          type='text'
          label='Potencial de Babeo'
          name='droolingPotential'
          placeholder={droolingPotential === '' ? '' : droolingPotential}
        />
        <Input
          className=''
          type='text'
          label='Tendencia a ladrar'
          name='bark'
          placeholder={bark === '' ? '' : bark}
        />
        <Input
          className=' '
          type='text'
          label='Acostumbrado a un piso'
          name='departmentAdapted'
          placeholder={departmentAdapted === '' ? '' : departmentAdapted}
        />
      </div>
    </div>
  );
};
export default OtherPropertiesDogForm;
