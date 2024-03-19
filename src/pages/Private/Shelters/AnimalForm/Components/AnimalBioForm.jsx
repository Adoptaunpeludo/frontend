import { Input } from '@nextui-org/react';
import { animalSizeEnum, genderEnum } from '../../../../../utils/enumData';
import { H3Title, SelectField } from '../../../../../components';
import { useAnimalDetails } from '../../../../Public/Animals/AnimalDetails/useAnimalDetails';

const AnimalBioForm = ({ slug = '' }) => {
  const data = useAnimalDetails(slug);
  const { name, age, breed, size, gender } = data;

  return (
    <div className="flex flex-col gap-2">
      <H3Title title="Bio" />
      <div className="flex w-full flex-wrap md:flex-nowrap gap-2 border-primary border-t-1 pt-3">
        <Input
          className="min-w-72 "
          type="text"
          label="Nombre"
          name="name"
          defaultValue={name ? name : ''}
        />
        <Input
          className="min-w-72 "
          type="text"
          label="Raza"
          name="breed"
          defaultValue={breed ? breed : ''}
        />
      </div>
      <div className="flex w-full flex-wrap md:flex-nowrap gap-2">
        <Input
          className=""
          type="number"
          label="Edad en años"
          name="age"
          defaultValue={age ? age : ''}
        />
        <SelectField
          label="Sexo"
          className=""
          name="gender"
          dataField={gender}
          dataEnum={genderEnum}
        />
        <SelectField
          label="Tamaño"
          className=""
          name="size"
          dataField={size}
          dataEnum={animalSizeEnum}
        />
      </div>
    </div>
  );
};
export default AnimalBioForm;