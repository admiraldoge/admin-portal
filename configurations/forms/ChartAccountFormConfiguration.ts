import * as yup from "yup";
export const createConfiguration = [
	{
		_template: 'string',
		key: 'name',
		label: 'Nombre',
		type: 'text',
		placeholder: 'abc...'
	},
	{
		_template: 'string',
		key: 'code',
		label: 'Código',
		type: 'text',
		placeholder: 'ABC...'
	},
	{
		_template: 'string',
		key: 'name',
		label: 'Nombre',
		type: 'text',
		placeholder: 'ABC...'
	},
	{
		_template: 'string',
		key: 'name',
		label: 'Imputable',
		type: 'text',
		placeholder: 'ABC...'
	},
	{
		_template: 'string',
		key: '',
		label: 'Tipo',
		type: 'text',
		placeholder: 'ABC...'
	},
]

export const editConfiguration = [
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
