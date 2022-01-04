import * as yup from "yup";
import {IMPUTABLE, NOT_IMPUTABLE} from "../../constants/forms";
export const createConfiguration = [
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
		placeholder: 'abc...',
		required: true
	},
	{
		_template: 'string_long',
		key: 'description',
		label: 'Descripción',
		type: 'text',
		placeholder: 'ABC...'
	}
]

export const editConfiguration = [
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
		placeholder: 'abc...',
		required: true
	},
	{
		_template: 'string_long',
		key: 'description',
		label: 'Descripción',
		type: 'text',
		placeholder: 'ABC...'
	}
]
export const validationSchema = {
	name: yup
		.string()
		.min(3,'El nombre debe tener al menos 3 carácteres.')
		.required('El nombre es obligatorio.'),
	code: yup
		.string()
		.min(3,'El código debe tener al menos 3 carácteres.')
}
