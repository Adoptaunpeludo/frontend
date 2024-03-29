import { Checkbox } from '@nextui-org/react';

import { H4Title } from '../../../../../components';
import { checkBoxStyleConfig } from '../../../../../utils/configFormFields';
import { facilitiesEnum } from '../../../../../utils/enumData';

const Accommodations = ({ facilities, isDisabled = true, className }) => {
  return (
    <div
      id="accommodations"
      className={`flex flex-col gap-2 rounded-lg py-2 font-poppins ${className}`}
    >
      <H4Title title="Alojamientos" />
      <div id="accommodationsCheck" className="flex flex-wrap gap-5 mx-7">
        {facilitiesEnum.map((facility, index) => (
          <Checkbox
            key={index}
            radius="none"
            size="sm"
            defaultSelected={facilities.includes(facility.value)}
            isReadOnly={isDisabled}
            defaultValue={facilities.includes(facility.value)}
            name="facilities"
            value={facility.value}
            classNames={checkBoxStyleConfig}
          >
            {facility.label}
          </Checkbox>
        ))}
      </div>
    </div>
  );
};
export default Accommodations;
