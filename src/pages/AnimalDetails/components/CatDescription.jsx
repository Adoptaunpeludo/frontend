import { InfoRow } from './InfoRow';

const CatDescription = ({ data }) => {
  return (
    <>
      <InfoRow label="Fácil de entrenar" value={data.easyTrain ? 'Si' : 'No'} />
      <InfoRow label="Nivel de energía" value={data.energyLevel} />
      <InfoRow label="Cantidad de muda" value={data.moltingAmount} />
      <InfoRow label="Nivel de Juego" value={data.playLevel} />
      <InfoRow
        label="Sociable con Niños"
        value={data.kidsFriendly ? 'Si' : 'No'}
      />
      <InfoRow label="Tendencia a arañar" value={data.scratchPotential} />
      <InfoRow
        label="Entrenado en el arenero"
        value={data.toiletTrained ? 'Si' : 'No'}
      />
    </>
  );
};

export default CatDescription;
