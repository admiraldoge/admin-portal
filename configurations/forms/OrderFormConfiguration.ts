import * as yup from "yup";
import {IMPUTABLE, NOT_IMPUTABLE} from "../../constants/forms";
export const createConfiguration = [
	{
		_template: 'select',
		key: 'activityId',
		label: 'Proyecto',
		type: 'number',
		required: false
	},
	{
		_template: 'select',
		key: 'expenseTypeId',
		label: 'Tipo de gasto',
		type: 'string',
		required: false
	},
	{
		_template: 'date',
		key: 'deadline',
		label: 'Fecha',
		type: 'date',
		required: false
	},
	{
		_template: 'string',
		key: 'description',
		label: 'Descripción',
		type: 'string',
		required: false
	},
	{
		_template: 'array',
		key: 'items',
		type: 'array',
		label: 'Items'
	},
]

export const editConfiguration = [
	{
		_template: 'select',
		key: 'activityId',
		label: 'Proyecto',
		type: 'number',
		required: false
	},
	{
		_template: 'select',
		key: 'expenseTypeId',
		label: 'Tipo de gasto',
		type: 'string',
		required: false
	},
	{
		_template: 'date',
		key: 'deadline',
		label: 'Fecha',
		type: 'date',
		required: false
	},
	{
		_template: 'string',
		key: 'description',
		label: 'Descripción',
		type: 'string',
		required: false
	},
	{
		_template: 'array',
		key: 'items',
		type: 'array',
		label: 'Items'
	},
]
export const validationSchema = {

}
