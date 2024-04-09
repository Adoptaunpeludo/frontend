import { Checkbox } from '@nextui-org/react';
import { H3Title } from '../../../../../components';
import { facilitiesEnum } from '../../../../../utils/enumData';

export const FacilitiesAsideColumn = ({ facilities }) => {
  return (
    <section>
      <H3Title
        title="alojamientos:"
        className={'border-primary border-b-1 pt-2'}
      />
      <ul className="mx-4 ">
        {facilitiesEnum.map((facility, index) => (
          <li className="py-2" key={index}>
            <Checkbox
              isSelected={facilities?.includes(facility.value)}
              isReadOnly
              radius="none"
              size="sm"
              className="font-poppins cursor-default"
            >
              {facility?.label}
            </Checkbox>
          </li>
        ))}
      </ul>
    </section>
  );
};
