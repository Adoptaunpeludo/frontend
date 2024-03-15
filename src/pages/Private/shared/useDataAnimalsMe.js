export const useDataAnimalsMe = () => {
  const data = [
    {
      id: 1,
      pet: 'Nera',
      size: 'small',
      gender: 'male',
      age: '29',
      location: 'Granada',
      publishStatus: 'publicado',
      status: 'Esperando Hogar'
    },
    {
      id: 2,
      pet: 'Nera',
      size: 'small',
      gender: 'male',
      age: '29',
      location: 'Granada',
      publishStatus: 'publicado',
      status: 'Esperando Hogar'
    },
    {
      id: 3,
      pet: 'Nera',
      size: 'small',
      gender: 'male',
      age: '29',
      location: 'Granada',
      publishStatus: 'publicado',
      status: 'reservado'
    },
    {
      id: 4,
      pet: 'Nera',
      size: 'small',
      gender: 'male',
      age: '29',
      location: 'Granada',
      publishStatus: 'pendiente',
      status: 'adoptado'
    },
    {
      id: 5,
      pet: 'Nera',
      size: 'small',
      gender: 'male',
      age: '29',
      location: 'Granada',
      publishStatus: 'rechazado',
      status: 'En Acogida'
    }
  ];

  const isLoading = false;
  const isError = false;

  return { data, isLoading, isError };
};
