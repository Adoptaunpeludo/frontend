import { InfoRow } from './InfoRow';

const BioDescription = ({ data }) => {
  return (
    <>
      <InfoRow label="Nombre" value={data.name} />
      <InfoRow label="Edad" value={data.age} />
      <InfoRow label="Raza" value={data.breed} />
      <InfoRow label="Sexo" value={data.gender} />
      <InfoRow label="Tamaño" value={data.size} />
    </>
  );
};

export default BioDescription;
