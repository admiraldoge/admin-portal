import * as yup from "yup";

export const editModalConfiguration = [
	{
		_template: 'string',
		key: 'name',
		label: 'Nombre',
		type: 'text',
		placeholder: 'abc...'
	},
	{
		_template: 'string',
		key: 'iso',
		label: 'ISO',
		type: 'text',
		placeholder: 'abc...'
	},
]
export const validationSchema = {
	name: yup
		.string()
		.min(5,'Inserta un nombre válido!')
		.required('El nombre es obligatorio.'),
	iso: yup
		.string()
		.min(2, 'Inserta una clave ISO válida')
		.required('La web es obligatoria.'),
}
