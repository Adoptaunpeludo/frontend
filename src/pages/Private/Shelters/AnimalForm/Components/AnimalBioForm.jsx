import { Input } from '@nextui-org/react';
import { useState } from 'react';
import { H2Title, SelectField } from '../../../../../components';
import {
  inputStyleConfig,
  selectStyleConfig,
} from '../../../../../utils/configFormFields';
import { animalSizeEnum, genderEnum } from '../../../../../utils/enumData';
import { validateField } from '../../../../../utils/validateField';

const AnimalBioForm = ({ data = {}, isDisabled, validateForm }) => {
  const { name, age, breed, size, gender } = data;

  const [petData, setPetData] = useState({});
  const [errors, setErrors] = useState({});

  const handleChange = (event) => {
    const { name, value } = event.target;
    setPetData({ ...petData, [name]: value });
    setErrors({ ...errors, [name]: validateField(name, value) });
    validateForm(Object.values(errors).every((error) => error === ''));
  };

  return (
    <div className="flex flex-col gap-3">
      <H2Title title="Bio" />
      <div className="flex w-full flex-wrap md:flex-nowrap  border-primary border-t-1 pt-3 gap-3">
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
          onBlur={handleChange}
          classNames={inputStyleConfig}
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
          classNames={inputStyleConfig}
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
          step="0.5"
          max="25"
          defaultValue={age ? age : ''}
          classNames={inputStyleConfig}
        />
        <SelectField
          isRequired
          isDisabled={isDisabled}
          label="Sexo"
          className=""
          name="gender"
          dataField={gender}
          dataEnum={genderEnum}
          classNames={selectStyleConfig}
        />
        <SelectField
          isRequired
          isDisabled={isDisabled}
          label="Tamaño"
          className=""
          name="size"
          dataField={size}
          dataEnum={animalSizeEnum}
          classNames={selectStyleConfig}
        />
      </div>
    </div>
  );
};
export default AnimalBioForm;
