import { Spinner } from '@nextui-org/react';
import { Goals } from '../../../../../components';
import { useAnimals } from '../../../Landing/useAnimals';
export const ShelterRescues = () => {
  const { data, isLoading } = useAnimals('all');

  if (isLoading) return <Spinner />;

  const rescues = [
    { image: 'adopted.svg', number: data?.adopted, label: 'Adoptados' },
    { image: 'foster.svg', number: data?.fostered, label: 'En acogida' },
    {
      image: 'waiting.svg',
      number: data?.awaitingHome,
      label: 'Esperando un hogar',
    },
  ];
  return <Goals rescues={rescues} />;
};
export default ShelterRescues;
