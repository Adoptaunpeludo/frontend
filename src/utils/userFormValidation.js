import * as z from 'zod';

const schema = z.object({
	dni: z
		.string()
		.length(9, {
			message: 'Un dni solo puede tener exactamente 9 caracteres',
		})
		.regex(/^[XYZ0-9]{1}[0-9]{7}[TRWAGMYFPDXBNJZSQVHLCKET]$/i, {
			message: 'El formato del dni/nie no es correcto',
		}),
	firstName: z
		.string()
		.min(3, { message: 'El nombre no puede tener menos de 3 caracteres' })
		.max(25, { message: 'El nombre no puede tener mas de 25 caracteres' })
		.regex(/^[A-Za-z]+$/, {
			message: 'El nombre solo puede contener letras',
		}),
	lastName: z
		.string()
		.min(3, { message: 'El apellido no puede tener menos de 3 caracteres' })
		.max(25, { message: 'El apellido no puede tener mas de 25 caracteres' })
		.regex(/^[A-Za-z]+$/, {
			message: 'El apellido solo puede contener letras',
		}),
	phoneNumber: z.string().length(9, {
		message: 'El número de telefono tiene que contener exactamente 9 números',
	}),
});

export const userFormValidation = (formData) => {
	try {
		const validatedData = schema.parse(formData);
		console.log('Valid data: ', validatedData);
		return null;
	} catch (error) {
		console.error('Validation error: ', error.errors);
		throw new Error('Error de validación: ' + JSON.stringify(error.errors));
	}
};
