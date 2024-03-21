//TODO: change import of the component shelterProfile and userProfile to this source

import {
  animalSizeEnum,
  boolDataEnum,
  energyEnum,
  genderEnum,
  legalFormEnum,
  moltingEnum,
  potentialEnum,
} from './enumData';

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
    { fieldName: 'Usuario: ', value: user.username },
    { fieldName: 'Ciudad: ', value: city },
  ];
  return animalShelterInfo;
};

export const animalBioInfo = ({ name, age, breed, gender, size }) => {
  const animalBioInfo = [
    { fieldName: 'Nombre: ', value: name },
    { fieldName: 'Raza: ', value: breed },
    { fieldName: 'Edad: ', value: `${age} años` },
    {
      fieldName: 'Sexo: ',
      value: `${genderEnum.filter((item) => item.value === gender)[0].label}`,
    },
    {
      fieldName: 'Tamaño: ',
      value: `${animalSizeEnum.filter((item) => item.value === size)[0].label}`,
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
      value: `${
        boolDataEnum.filter((item) => item.value === easyTrain)[0].label
      }`,
    },
    {
      fieldName: 'Nivel de energía: ',
      value: `${
        energyEnum.filter((item) => item.value === energyLevel)[0].label
      }`,
    },
    {
      fieldName: 'Cantidad de muda: ',
      value: `${
        moltingEnum.filter((item) => item.value === moltingAmount)[0].label
      }`,
    },
    {
      fieldName: 'Nivel de babeo: ',
      value: `${
        potentialEnum.filter((item) => item.value === droolingPotential)[0]
          .label
      }`,
    },
    {
      fieldName: 'Intensidad de ladrido: ',
      value: `${potentialEnum.filter((item) => item.value === bark)[0].label}`,
    },
    {
      fieldName: 'Adaptado a un piso: ',
      value: `${
        boolDataEnum.filter((item) => item.value === departmentAdapted)[0].label
      }`,
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
      value: `${
        boolDataEnum.filter((item) => item.value === easyTrain)[0].label
      }`,
    },
    {
      fieldName: 'Entrenado en el arenero: ',
      value: `${
        boolDataEnum.filter((item) => item.value === toiletTrained)[0].label
      }`,
    },
    {
      fieldName: 'Nivel de energía: ',
      value: `${
        energyEnum.filter((item) => item.value === energyLevel)[0].label
      }`,
    },
    {
      fieldName: 'Cantidad de muda: ',
      value: `${
        moltingEnum.filter((item) => item.value === moltingAmount)[0].label
      }`,
    },
    {
      fieldName: 'Nivel de Juego: ',
      value: `${
        potentialEnum.filter((item) => item.value === playLevel)[0].label
      }`,
    },
    {
      fieldName: 'Tendencia a arañar: ',
      value: `${
        potentialEnum.filter((item) => item.value === scratchPotential)[0].label
      }`,
    },
    {
      fieldName: 'Sociable con Niños: ',
      value: `${
        boolDataEnum.filter((item) => item.value === kidsFriendly)[0].label
      }`,
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
      value: `${
        legalFormEnum.filter((item) => item.value === legalForms)[0].label
      }`,
    },
  ];
  return shelterInformation;
};

export const vetInformation = ({ veterinaryFacilities, ownVet }) => {
  const vetInformation = [
    {
      fieldName: 'Instalaciones veterinarias: ',
      value: `${
        boolDataEnum.filter((item) => item.value === veterinaryFacilities)[0]
          .label
      }`,
    },
    {
      fieldName: 'Veterinario propio: ',
      value: `${boolDataEnum.filter((item) => item.value === ownVet)[0].label}`,
    },
  ];
  return vetInformation;
};
