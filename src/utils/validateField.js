export const validateField = (name, value, password) => {
  switch (name) {
    case 'breed':
    case 'name':
    case 'username':
    case 'firstName':
    case 'lastName':
      return !/^[0-9a-zñáéíóúü\s]{3,25}$/i.test(value.trim())
        ? `${
            (name === 'breed' && 'El nombre de la raza debe') ||
            (name === 'name' && 'El nombre debe') ||
            (name === 'firstName' && 'El nombre debe') ||
            (name === 'lastName' && 'Los apellidos deben') ||
            (name === 'username' && 'El nombre de usuario debe')
          } tener al menos 3 caracteres válidos, y no más de 25.`
        : '';
    case 'email':
      return !/^[\w-.]+@([\w-]+\.)+[\w-]{2,4}$/i.test(value.trim())
        ? 'El correo electrónico ingresado no es válido.'
        : '';
    case 'oldPassword':
    case 'newPassword':
    case 'password':
      return value.trim().length < 8
        ? 'La contraseña debe tener al menos 8 caracteres.'
        : '';
    case 'repeatPassword':
      return value.trim() !== password ? 'Las contraseñas no coinciden' : '';
    case 'cif':
      return !/^[A-HJNP-SUVW]{1}[0-9]{7}[0-9A-J]$/i.test(value.trim())
        ? 'El CIF no es válido.'
        : '';
    case 'dni':
      return !/^[XYZ0-9]{1}[0-9]{7}[TRWAGMYFPDXBNJZSQVHLCKE]$/i.test(
        value.trim()
      )
        ? 'El DNI no es válido.'
        : '';
    case 'phoneNumber':
      return !/^(\+[0-9]{1,3})?[0-9]{8,14}$/.test(value.trim())
        ? 'No es un número de teléfono válido.'
        : '';
    default:
      return '';
  }
};

// email regex 1 ^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$
// email regex 2 ^[A-Z0-9._%+-]+@[A-Z0-9.-]+.[A-Z]{2,4}$
