import * as yup from "yup";
import {IMPUTABLE, NOT_IMPUTABLE} from "../../constants/forms";
export const createConfiguration = [
	{
		_template: 'select',
		key: 'parentId',
		label: 'Padre',
		type: 'text',
		placeholder: 'abc...'
	},
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
		_template: 'string_long',
		key: 'description',
		label: 'Descripción',
		type: 'text',
		placeholder: 'ABC...'
	},
	{
		_template: 'one_selection_radio',
		key: 'isImputable',
		label: 'Imputable',
		type: 'text',
		placeholder: '',
		options: [{label: 'Si', value: IMPUTABLE}, {label: 'No', value: NOT_IMPUTABLE}]
	},
	{
		_template: 'one_selection_radio',
		key: 'isDebtor',
		label: 'Tipo',
		type: 'boolean',
		placeholder: '',
		options: [{label: 'Acreedor', value: true}, {label: 'Deudor', value: false}]
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
}
