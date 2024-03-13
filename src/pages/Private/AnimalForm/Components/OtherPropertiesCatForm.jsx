import { Input } from '@nextui-org/react';
import { H3Title } from '../../../shared';

const OtherPropertiesCatForm = ({ data }) => {
  const {
    easyTrain,
    energyLevel,
    moltingAmount,
    playLevel,
    kidsFriendly,
    scratchPotential,
    toiletTrained
  } = data;
  return (
    <div className='flex flex-col gap-2'>
      <H3Title title='Otras Características' />
      <div className='flex w-full flex-wrap md:flex-nowrap gap-2 border-primary border-t-1 pt-3'>
        <Input
          className=''
          type='text'
          label='Entrenado en el arenero'
          name='toiletTrained'
          placeholder={toiletTrained === '' ? '' : toiletTrained}
        />
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
          label='Cantidad de muda'
          name='moltingAmount'
          placeholder={moltingAmount === '' ? '' : moltingAmount}
        />
        <Input
          className=' '
          type='text'
          label='Nivel de energía'
          name='energyLevel'
          placeholder={energyLevel === '' ? '' : energyLevel}
        />
      </div>
      <div className='flex w-full flex-wrap md:flex-nowrap gap-2 border-primary border-t-1 pt-3'>
        <Input
          className=''
          type='text'
          label='Nivel de juego'
          name='playLevel'
          placeholder={playLevel === '' ? '' : playLevel}
        />
        <Input
          className=''
          type='text'
          label='Tendencia a arañar'
          name='scratchPotential'
          placeholder={scratchPotential === '' ? '' : scratchPotential}
        />
        <Input
          className=' '
          type='text'
          label='Sociable con niños'
          name='kidsFriendly'
          placeholder={kidsFriendly === '' ? '' : kidsFriendly}
        />
      </div>
    </div>
  );
};
export default OtherPropertiesCatForm;

//     "easyTrain": true,
//     "energyLevel": "high",
//     "moltingAmount": "light",
//     "status": "awaiting_home",
//     "type": "cat",
//     "gender": "male",
//     "numFavs": 0,
//     "playLevel": "moderate",
//     "kidsFriendly": false,
//     "scratchPotential": "high",
//     "toiletTrained": true,
//     "city": "Granada",
//     "user": {
//         "avatar": "avatar.png",
//         "username": "shelter1",
//         "isOnline": false
//     }
// }
