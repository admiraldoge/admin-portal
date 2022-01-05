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
		_template: 'string',
		key: 'percentage',
		label: 'Porcentage',
		type: 'number',
		placeholder: '100',
		required: true
	},
	{
		_template: 'string',
		key: 'percentageSubjectToTaxCredit',
		label: 'Porcentage sujeto a C.F.',
		type: 'number',
		placeholder: '100',
		required: true
	},
	{
		_template: 'select',
		key: 'chartAccountId',
		label: 'Plan de cuentas',
		required: true
	},
	{
		_template: 'select',
		key: 'type',
		label: 'Tipo',
		options: [
			{
				label: 'Impuestos de compra',
				value: 'PURCHASE_TAX'
			},
			{
				label: 'Impuestos de venta',
				value: 'SALE_TAX'
			}
			],
		required: true
	},
	{
		_template: 'select',
		key: 'transactionTypeId',
		label: 'Tipo de transanction',
		required: true
	},
	{
		_template: 'string_long',
		key: 'description',
		label: 'Descripción',
		type: 'text',
		placeholder: 'ABC...'
	},
	{
		_template: 'boolean',
		key: 'transferTaxEnabled',
		options: ['Habilitado','Desabilitado'],
		label: 'Impuesto a las transferencias',
		type: 'boolean',
		placeholder: 'ABC...'
	},
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
		.min(3,'El código debe tener al menos 3 carácteres.'),
	percentage: yup
		.number()
		.min(0,'El porcentaje debe ser positivo.'),
	percentageSubjectToTaxCredit: yup
		.number()
		.min(0,'El porcentaje debe ser positivo.'),
	chartAccountId: yup
		.string()
		.min(0,'El plan de cuentas es obligatorio.')
		.required('El plan de cuentas es obligatorio.'),
	type: yup
		.string()
		.min(0,'El tipo es obligatorio.')
		.required('El tipo es obligatorio.'),
	transactionTypeId: yup
		.string()
		.min(0,'El plan de cuentas es obligatorio.')
		.required('El plan de cuentas es obligatorio.'),
}
