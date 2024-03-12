import { InfoRow } from './InfoRow';

const DogDescription = ({ data }) => {
  return (
    <>
      <InfoRow label="Fácil de entrenar" value={data.easyTrain ? 'Si' : 'No'} />
      <InfoRow label="Nivel de energía" value={data.energyLevel} />
      <InfoRow label="Cantidad de muda" value={data.moltingAmount} />
      <InfoRow
        label="Fácil de entrenar:"
        value={data.easyTrain ? 'Sí' : 'No'}
      />
      <InfoRow label="Nivel de babeo" value={data.droolingPotential} />
      <InfoRow label="Intensidad de ladrido" value={data.bark} />
    </>
  );
};

export default DogDescription;
