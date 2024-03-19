import {
  boolDataEnum,
  energyEnum,
  moltingEnum,
  potentialEnum,
} from '../../../../../utils/enumData';
import { H3Title, SelectField } from '../../../../../components';

const OtherPropertiesCatForm = ({ data }) => {
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
      <H3Title title="Otras Características" />
      <div className="flex w-full flex-wrap md:flex-nowrap gap-2 border-primary border-t-1 pt-3">
        <SelectField
          label="Entrenado en el arenero"
          className=""
          name="toiletTrained"
          dataField={toiletTrained}
          dataEnum={boolDataEnum}
        />
        <SelectField
          label="Fácil de entrenar"
          className=""
          name="easyTrain"
          dataField={easyTrain}
          dataEnum={boolDataEnum}
        />
        <SelectField
          label="Cantidad de muda"
          className=""
          name="moltingAmount"
          dataField={moltingAmount}
          dataEnum={moltingEnum}
        />
        <SelectField
          label="Nivel de energía"
          className=""
          name="energyLevel"
          dataField={energyLevel}
          dataEnum={energyEnum}
        />
      </div>
      <div className="flex w-full flex-wrap md:flex-nowrap gap-2 border-primary border-t-1 pt-3">
        <SelectField
          label="Nivel de juego"
          className=""
          name="playLevel"
          dataField={playLevel}
          dataEnum={potentialEnum}
        />

        <SelectField
          label="Tendencia a arañar"
          className=""
          name="scratchPotential"
          dataField={scratchPotential}
          dataEnum={potentialEnum}
        />
        <SelectField
          label="Sociable con niños"
          className=""
          name="kidsFriendly"
          dataField={kidsFriendly}
          dataEnum={boolDataEnum}
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
