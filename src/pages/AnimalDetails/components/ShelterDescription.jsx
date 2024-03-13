import { InfoRow } from './InfoRow';

const ShelterDescription = ({ data }) => {
  return (
    <>
      <InfoRow label="Fecha de entrada" value={data.createdAt} />
      <InfoRow label="Protectora" value={data.user.username} />
      <InfoRow label="Ciudad" value={data.city} />
    </>
  );
};

export default ShelterDescription;
