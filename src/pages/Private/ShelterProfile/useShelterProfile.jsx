export const useShelterProfile = () => {
  const data = {
    cif: 'X.99.999.999',
    legalForms: 'Asociación',
    ownVet: true,
    description:
      'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Duis ultricies dapibus leo, sed tempus dolor commodo vel. Cras non metus in ex condimentum congue id eu lacus. Etiam eleifend interdum mollis. Nunc ante erat, laoreet nec ante gravida, mattis euismod turpis. Aliquam dictum egestas lectus vitae rutrum. Curabitur ornare faucibus sapien nec semper. Nam eget fringilla velit.',
    id: '052f1404-ff7a-4ec1-9919-64656f5577cb',
    email: 'jmab2k@gmail.com',
    userName: 'jmab2k',
    createdAt: '2024-03-07T17:55:43.302Z',
    avatar: 'avatar.png',
    role: 'shelter',
    dni: '99.999.999-X',
    firstName: 'John',
    isOnline: false,
    lastName: 'Doe',
    veterinaryFacilities: true,
    facilities: [true, false, false, true, true],
    images: [],
    socialMedia: [],
    phone_number: '666-666-666',
    city: 'Sevilla'
  };

  const isLoading = false;
  const isError = false;

  return { data, isLoading, isError };
};
