import { Input } from '@nextui-org/react';
import { animalSizeEnum, genderEnum } from '../../../../../utils/enumData';
import { H3Title, SelectField } from '../../../../../components';
import { useState } from 'react';
import { validateField } from '../../../../../utils/validateField';

const AnimalBioForm = ({ data = {}, isDisabled, setErrorsState }) => {
  const { name, age, breed, size, gender } = data;

  const [petData, setPetData] = useState({});
  const [errors, setErrors] = useState({});

  const handleChange = (event) => {
    const { name, value } = event.target;
    setPetData({ ...petData, [name]: value });
    setErrors({ ...errors, [name]: validateField(name, value) });
    setErrorsState(errors);
  };

  return (
    <div className="flex flex-col gap-2">
      <H3Title title="Bio" />
      <div className="flex w-full flex-wrap md:flex-nowrap gap-2 border-primary border-t-1 pt-3">
        <Input
          isRequired
          isDisabled={isDisabled}
          className="min-w-72 "
          type="text"
          label="Nombre"
          name="name"
          color={errors.name ? 'danger' : 'none'}
          errorMessage={errors.name}
          defaultValue={name ? name : ''}
          onChange={handleChange}
        />
        <Input
          isRequired
          isDisabled={isDisabled}
          className="min-w-72 "
          type="text"
          label="Raza"
          name="breed"
          color={errors.breed ? 'danger' : 'none'}
          errorMessage={errors.breed}
          defaultValue={breed ? breed : ''}
          onChange={handleChange}
        />
      </div>
      <div className="flex w-full flex-wrap md:flex-nowrap gap-2">
        <Input
          isRequired
          isDisabled={isDisabled}
          className=""
          type="number"
          label="Edad en años"
          name="age"
          min="0"
          max="25"
          defaultValue={age ? age : ''}
        />
        <SelectField
          isRequired
          isDisabled={isDisabled}
          label="Sexo"
          className=""
          name="gender"
          dataField={gender}
          dataEnum={genderEnum}
        />
        <SelectField
          isRequired
          isDisabled={isDisabled}
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
