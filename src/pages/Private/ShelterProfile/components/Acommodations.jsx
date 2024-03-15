import { Checkbox } from '@nextui-org/react';
import { H4Title } from '../../../../components';

const Accommodations = ({ facilities, isDisable = true }) => {
  const facilitiesInformation = [
    { fieldName: 'Hogares de acogida', value: facilities[0] },
    {
      fieldName: 'Instalaciones municipales o públicas',
      value: facilities[1],
    },
    { fieldName: 'Instalaciones arrendadas', value: facilities[2] },
    { fieldName: 'Instalaciones propias', value: facilities[3] },
    { fieldName: 'Residencias privadas (arrendadas)', value: facilities[4] },
  ];
  return (
    <div
      id="accommodations"
      className="flex flex-col gap-2 rounded-lg bg-default-100 py-2"
    >
      <H4Title title="Alojamientos" />
      <div id="accommodationsCheck" className="flex flex-wrap gap-5 mx-7">
        {facilitiesInformation.map((facility, index) => (
          <Checkbox
            key={index}
            radius="none"
            size="sm"
            isSelected={facility.value}
            isDisabled={isDisable}
          >
            {facility.fieldName}
          </Checkbox>
        ))}
      </div>
    </div>
  );
};
export default Accommodations;
