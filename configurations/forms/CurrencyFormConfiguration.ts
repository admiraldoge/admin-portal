import * as yup from "yup";

export const createConfiguration = [
	{
		_template: 'string',
		key: 'name',
		label: 'Nombre',
		type: 'text',
		placeholder: 'Boliviano'
	},
	{
		_template: 'string',
		key: 'iso',
		label: 'ISO',
		type: 'text',
		placeholder: 'BOB'
	},
	{
		_template: 'string',
		key: 'symbol',
		label: 'Símbolo',
		type: 'text',
		placeholder: 'Bs.'
	},
]
export const editConfiguration = [
	{
		_template: 'string',
		key: 'name',
		label: 'Nombre',
		type: 'text',
		placeholder: 'Boliviano'
	},
	{
		_template: 'string',
		key: 'iso',
		label: 'ISO',
		type: 'text',
		placeholder: 'BOB'
	},
	{
		_template: 'string',
		key: 'symbol',
		label: 'Símbolo',
		type: 'text',
		placeholder: 'Bs.'
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
