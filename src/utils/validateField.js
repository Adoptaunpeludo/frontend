export const validateField = (name, value, password) => {
  switch (name) {
    case 'username':
      return value.trim().length < 3 ||
        !/^[0-9A-Za-zÑñÁáÉéÍíÓóÚúÜü\s]+$/i.test(value.trim())
        ? 'El nombre de usuario debe tener al menos 3 caracteres válidos'
        : '';
    case 'email':
      return !/^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/i.test(value.trim())
        ? 'El correo electrónico ingresado no es válido.'
        : '';
    case 'password':
      return value.trim().length < 8
        ? 'La contraseña debe tener al menos 8 caracteres.'
        : '';
    case 'repeatPassword':
      return value.trim() !== password ? 'Las contraseñas no coinciden' : '';
    case 'cif':
      return value.trim().length !== 9 ? 'El cif debe tener 9 caracteres' : '';
    default:
      return '';
  }
};

// email regex 1 ^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$
// email regex 2 ^[A-Z0-9._%+-]+@[A-Z0-9.-]+.[A-Z]{2,4}$
