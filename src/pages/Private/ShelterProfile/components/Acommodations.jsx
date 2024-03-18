import { Checkbox } from '@nextui-org/react';
import { H4Title } from '../../../../components';

import { facilitiesEnum } from '../../../../utils/enumData';

const Accommodations = ({ facilities, isDisabled = true }) => {
  return (
    <div
      id="accommodations"
      className="flex flex-col gap-2 rounded-lg bg-default-100 py-2"
    >
      <H4Title title="Alojamientos" />
      <div id="accommodationsCheck" className="flex flex-wrap gap-5 mx-7">
        {facilitiesEnum.map((facility, index) => (
          <Checkbox
            key={index}
            radius="none"
            size="sm"
            defaultSelected={facilities.includes(facility.value)}
            isDisabled={isDisabled}
            defaultValue={facilities.includes(facility.value)}
            name="facilities"
            value={facility.value}
          >
            {facility.label}
          </Checkbox>
        ))}
      </div>
    </div>
  );
};
export default Accommodations;
