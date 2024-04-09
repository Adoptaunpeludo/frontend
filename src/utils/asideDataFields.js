import {
  animalSizeEnum,
  boolDataEnum,
  energyEnum,
  genderEnum,
  legalFormEnum,
  moltingEnum,
  potentialEnum,
} from './enumData';

export const isNullDataField = (field, dataEnum) => {
  if (field !== null && field !== '')
    return dataEnum.filter((item) => item.value === field)[0]?.label;
  return '';
};
export const ageDataField = (age) => {
  return `${age} ${age === 1 ? 'año' : 'años'}`;
};

export const userInformation = ({
  createdAt,
  username,
  firstName,
  lastName,
  dni,
  phone_number,
  email,
  city,
}) => {
  const entryDate = new Date(createdAt);
  const userInformation = [
    {
      fieldName: 'Fecha de entrada: ',
      value: `${entryDate.getDate()}/${
        entryDate.getMonth() + 1
      }/${entryDate.getFullYear()}`,
    },
    { fieldName: 'Usuario: ', value: username },
    { fieldName: 'Nombre: ', value: firstName },
    { fieldName: 'Apellidos: ', value: lastName },
    { fieldName: 'Dni: ', value: dni },
    { fieldName: 'Teléfono: ', value: phone_number },
    { fieldName: 'Email: ', value: email },
    { fieldName: 'Ciudad: ', value: city },
  ];
  return userInformation;
};

export const animalShelterInfo = ({ createdAt, user, city }) => {
  const entryDate = new Date(createdAt);
  const animalShelterInfo = [
    {
      fieldName: 'Fecha de entrada: ',
      value: `${entryDate.getDate()}/${
        entryDate.getMonth() + 1
      }/${entryDate.getFullYear()}`,
    },
    { fieldName: 'Protectora: ', value: user.username },
    { fieldName: 'Ciudad: ', value: city },
  ];
  return animalShelterInfo;
};

export const animalBioInfo = ({ name, age, breed, gender, size }) => {
  const animalBioInfo = [
    { fieldName: 'Nombre: ', value: name },
    { fieldName: 'Raza: ', value: breed },
    { fieldName: 'Edad: ', value: ageDataField(age) },
    {
      fieldName: 'Sexo: ',
      value: isNullDataField(gender, genderEnum),
    },
    {
      fieldName: 'Tamaño: ',

      value: isNullDataField(size, animalSizeEnum),
    },
  ];
  return animalBioInfo;
};

export const dogDescription = ({
  easyTrain,
  energyLevel,
  moltingAmount,
  departmentAdapted,
  droolingPotential,
  bark,
}) => {
  const dogDescription = [
    {
      fieldName: 'Fácil de entrenar: ',

      value: isNullDataField(easyTrain, boolDataEnum),
    },
    {
      fieldName: 'Nivel de energía: ',

      value: isNullDataField(energyLevel, energyEnum),
    },
    {
      fieldName: 'Cantidad de muda: ',

      value: isNullDataField(moltingAmount, moltingEnum),
    },
    {
      fieldName: 'Nivel de babeo: ',

      value: isNullDataField(droolingPotential, potentialEnum),
    },
    {
      fieldName: 'Intensidad de ladrido: ',

      value: isNullDataField(bark, potentialEnum),
    },
    {
      fieldName: 'Adaptado a un piso: ',

      value: isNullDataField(departmentAdapted, boolDataEnum),
    },
  ];
  return dogDescription;
};

export const catDescription = ({
  easyTrain,
  energyLevel,
  moltingAmount,
  playLevel,
  kidsFriendly,
  scratchPotential,
  toiletTrained,
}) => {
  const catDescription = [
    {
      fieldName: 'Fácil de entrenar: ',

      value: isNullDataField(easyTrain, boolDataEnum),
    },
    {
      fieldName: 'Entrenado en el arenero: ',

      value: isNullDataField(toiletTrained, boolDataEnum),
    },
    {
      fieldName: 'Nivel de energía: ',

      value: isNullDataField(energyLevel, energyEnum),
    },
    {
      fieldName: 'Cantidad de muda: ',

      value: isNullDataField(moltingAmount, moltingEnum),
    },
    {
      fieldName: 'Nivel de Juego: ',

      value: isNullDataField(playLevel, potentialEnum),
    },
    {
      fieldName: 'Tendencia a arañar: ',

      value: isNullDataField(scratchPotential, potentialEnum),
    },
    {
      fieldName: 'Sociable con Niños: ',
      value: isNullDataField(kidsFriendly, boolDataEnum),
    },
  ];
  return catDescription;
};

export const shelterInformation = ({
  createdAt,
  username,
  phoneNumber,
  email,
  city,
  cif,
  legalForms,
}) => {
  const entryDate = new Date(createdAt);
  const shelterInformation = [
    {
      fieldName: 'Fecha de entrada: ',
      value: `${entryDate.getDate()}/${
        entryDate.getMonth() + 1
      }/${entryDate.getFullYear()}`,
    },
    { fieldName: 'Nombre: ', value: username },
    { fieldName: 'Teléfono: ', value: phoneNumber },
    { fieldName: 'Email: ', value: email },
    { fieldName: 'Ciudad: ', value: city },
    { fieldName: 'Cif: ', value: cif },
    {
      fieldName: 'Forma Legal: ',
      value: isNullDataField(legalForms, legalFormEnum),
    },
  ];
  return shelterInformation;
};

export const vetInformation = ({ veterinaryFacilities, ownVet }) => {
  const vetInformation = [
    {
      fieldName: 'Instalaciones veterinarias: ',
      value: isNullDataField(veterinaryFacilities, boolDataEnum),
    },
    {
      fieldName: 'Veterinario propio: ',
      value: isNullDataField(ownVet, boolDataEnum),
    },
  ];
  return vetInformation;
};
