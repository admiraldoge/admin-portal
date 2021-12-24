import * as yup from "yup";

export const formTemplate = [
	{
		_template: 'string',
		key: 'name',
		label: 'Nombre',
		type: 'text',
		placeholder: 'abc...'
	},
	{
		_template: 'string',
		key: 'web',
		label: 'Web',
		type: 'text',
		placeholder: 'www.google.com'
	},
	{
		_template: 'longString',
		key: 'description',
		label: 'Descripción',
		type: 'text',
		placeholder: 'Esta compañía es ...'
	}
]

export const validationSchema = {
	name: yup
		.string()
		.min(5,'Inserta un nombre válido!')
		.required('El nombre es obligatorio.'),
	web: yup
		.string()
		.min(8, 'Inserta una web válida!')
		.required('La web es obligatoria.'),
}
