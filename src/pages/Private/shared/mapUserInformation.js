export const userInformation = ({
  createdAt,
  username,
  firstName,
  lastName,
  dni,
  phoneNumber,
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
    { fieldName: 'Teléfono: ', value: phoneNumber },
    { fieldName: 'Email: ', value: email },
    { fieldName: 'Ciudad: ', value: city },
  ];
  return userInformation;
};
