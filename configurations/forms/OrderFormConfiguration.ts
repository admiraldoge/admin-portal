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
		key: 'date',
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
		_template: 'autocomplete',
		key: 'item',
		label: 'Item',
		required: false,
		index: 'item',
		type: 'number',
		fields: [ "name", "code" ]
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
		required: false
	},
	{
		_template: 'select',
		key: 'expenseTypeId',
		label: 'Tipo de gasto',
		required: false
	},
	{
		_template: 'date',
		key: 'date',
		label: 'Fecha',
		required: false
	},
	{
		_template: 'string_long',
		key: 'description',
		label: 'Descripción',
		required: false
	},
	{
		_template: 'autocomplete',
		key: 'item',
		label: 'Descripción',
		required: false
	},
]
export const validationSchema = {

}
