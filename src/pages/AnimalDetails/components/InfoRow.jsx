import { Divider } from '@nextui-org/react';

export const InfoRow = ({ label, value }) => (
  <div>
    <div className="flex flex-row justify-between m-1">
      <p>{label}:</p>
      <p>{value}</p>
    </div>
    <Divider />
  </div>
);
