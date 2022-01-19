import * as yup from "yup";
import {IMPUTABLE, NOT_IMPUTABLE} from "../../constants/forms";
export const createConfiguration = [
	{
		_template: 'select',
		key: 'activityId',
		label: 'Proyecto',
		required: true
	},
	{
		_template: 'select',
		key: 'expenseTypeId',
		label: 'Tipo de gasto',
		required: true
	},
	{
		_template: 'date',
		key: 'date',
		label: 'Fecha',
		required: true
	},
	{
		_template: 'string',
		key: 'description',
		label: 'Descripción',
		required: true
	},
	{
		_template: 'autocomplete',
		key: 'item',
		label: 'Item',
		required: true,
		index: 'item',
		fields: [ "name", "code" ]
	},
]

export const editConfiguration = [
	{
		_template: 'select',
		key: 'activityId',
		label: 'Proyecto',
		required: true
	},
	{
		_template: 'select',
		key: 'expenseTypeId',
		label: 'Tipo de gasto',
		required: true
	},
	{
		_template: 'date',
		key: 'date',
		label: 'Fecha',
		required: true
	},
	{
		_template: 'string_long',
		key: 'description',
		label: 'Descripción',
		required: true
	},
	{
		_template: 'autocomplete',
		key: 'item',
		label: 'Descripción',
		required: true
	},
]
export const validationSchema = {

}
