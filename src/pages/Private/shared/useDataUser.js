export const userInformation = ({
  createdAt,
  userName,
  firstName,
  lastName,
  dni,
  phone_number,
  email,
  city
}) => {
  const entryDate = new Date(createdAt);
  const userInformation = [
    {
      fieldName: 'Fecha de entrada: ',
      value: `${entryDate.getDate()}/${
        entryDate.getMonth() + 1
      }/${entryDate.getFullYear()}`
    },
    { fieldName: 'Usuario: ', value: userName },
    { fieldName: 'Nombre: ', value: firstName },
    { fieldName: 'Apellidos: ', value: lastName },
    { fieldName: 'Dni: ', value: dni },
    { fieldName: 'Teléfono: ', value: phone_number },
    { fieldName: 'Email: ', value: email },
    { fieldName: 'Ciudad: ', value: city }
  ];
  return userInformation;
};
