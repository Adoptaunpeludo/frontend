export const validateField = (name, value) => {
	switch (name) {
		case 'role':
			return value === undefined ? 'Selecciones un tipo de perfil' : '';
		case 'username':
			return value.trim().length < 3
				? 'El nombre de usuario debe tener al menos 3 caracteres'
				: '';
		case 'email':
			return !/^[A-Z0-9._%+-]+@[A-Z0-9.-]+.[A-Z]{2,4}$/i.test(value.trim())
				? 'El correo electrónico ingresado no es válido.'
				: '';
		case 'password':
			return value.trim().length < 8
				? 'La contraseña debe tener al menos 8 caracteres.'
				: '';
		case 'repeatPassword':
			return value.trim().length < 8
				? 'La contraseña debe tener al menos 8 caracteres.'
				: '';
		default:
			return '';
	}
};
