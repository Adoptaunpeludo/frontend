import { Checkbox } from '@nextui-org/react';
import { H4Title } from '../../../../components';
import { useUser } from '../../../Layout/useUser';

const Accommodations = ({ isDisable = true }) => {
  const { data } = useUser();

  const { facilities } = data;

  return (
    <div
      id="accommodations"
      className="flex flex-col gap-2 rounded-lg bg-default-100 py-2"
    >
      <H4Title title="Alojamientos" />
      <div id="accommodationsCheck" className="flex flex-wrap gap-5 mx-7">
        {facilities.map((facility, index) => (
          <Checkbox
            key={index}
            radius="none"
            size="sm"
            isSelected={facility}
            isDisabled={isDisable}
          >
            {facility}
          </Checkbox>
        ))}
      </div>
    </div>
  );
};
export default Accommodations;
