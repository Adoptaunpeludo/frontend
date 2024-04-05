import { isNullDataField } from './asideDataFields';
import {
  adoptionPublishStatusEnum,
  animalSizeEnum,
  genderEnum,
  statusPetEnum,
} from './enumData';

export const translateStatusAnimals = (animals) => {
  return animals.map((animal) => {
    return {
      ...animal,
      gender: translateValue('gender', animal.gender),
      size: translateValue('size', animal.size),
      publishStatus: translateValue('publishStatus', animal.publishStatus),
      status: translateValue('status', animal.status),
      age: translateValue('age', animal.age),
    };
  });
};

const translateValue = (key, value) => {
  switch (key) {
    case 'gender':
      return isNullDataField(value, genderEnum);
    case 'size':
      return isNullDataField(value, animalSizeEnum);
    case 'publishStatus':
      return isNullDataField(value, adoptionPublishStatusEnum);
    case 'status':
      return isNullDataField(value, statusPetEnum);
    case 'age':
      return `${value} ${value === 1 ? 'año' : 'años'}`;
    default:
      return value;
  }
};
