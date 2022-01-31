import * as yup from "yup";
import {IMPUTABLE, NOT_IMPUTABLE} from "../../constants/forms";
export const createConfiguration = [
	{
		_template: 'select',
		key: 'expenseTypeId',
		label: 'Tipo de gasto',
		required: true
	},
	{
		_template: 'select',
		key: 'categoryId',
		label: 'Categoría',
	},
	{
		_template: 'select',
		key: 'brandId',
		label: 'Marca',
	},
	{
		_template: 'select',
		key: 'unitOfMeasureId',
		label: 'Unidad de medida',
		required: true
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
		placeholder: 'abc...',
		required: true
	},
	{
		_template: 'string',
		key: 'description',
		label: 'Descripción',
		type: 'text',
		placeholder: 'abc...'
	},
	{
		_template: 'string',
		key: 'inputPrice',
		label: 'Precio',
		type: 'number',
		placeholder: '0'
	},
	{
		_template: 'select',
		key: 'giveChartAccountId',
		label: 'Cuenta contable',
	},
	{
		_template: 'select',
		key: 'receiveChartAccountId',
		label: 'Cuenta contable',
	},
	{
		_template: 'boolean',
		key: 'inventariable',
		options: ['Habilitado','Desabilitado'],
		label: 'Inventariable',
		type: 'boolean',
		placeholder: 'ABC...'
	},
]

export const editConfiguration = [
	{
		_template: 'select',
		key: 'expenseTypeId',
		label: 'Tipo de gasto',
		required: true
	},
	{
		_template: 'select',
		key: 'categoryId',
		label: 'Categoría',
	},
	{
		_template: 'select',
		key: 'brandId',
		label: 'Marca',
	},
	{
		_template: 'select',
		key: 'unitOfMeasureId',
		label: 'Unidad de medida',
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
		placeholder: 'abc...',
	},
	{
		_template: 'string',
		key: 'description',
		label: 'Descripción',
		type: 'text',
		placeholder: 'abc...'
	},
	{
		_template: 'string',
		key: 'inputPrice',
		label: 'Precio',
		type: 'number',
		placeholder: '0'
	},
	{
		_template: 'select',
		key: 'giveChartAccountId',
		label: 'Cuenta contable',
	},
	{
		_template: 'select',
		key: 'receiveChartAccountId',
		label: 'Cuenta contable',
	},
	{
		_template: 'boolean',
		key: 'inventariable',
		options: ['Habilitado','Desabilitado'],
		label: 'Inventariable',
		type: 'boolean',
		placeholder: 'ABC...'
	},
]
export const validationSchema = {
	expenseTypeId: yup
		.string()
		.min(0,'El plan de cuentas es obligatorio.')
		.required('El plan de cuentas es obligatorio.'),
	categoryId: yup
		.string()
		.min(0,'El plan de cuentas es obligatorio.'),
	brandId: yup
		.string()
		.min(0,'El plan de cuentas es obligatorio.'),
	unitOfMeasureId: yup
		.string()
		.min(0,'El plan de cuentas es obligatorio.')
		.required('El plan de cuentas es obligatorio.'),
	name: yup
		.string()
		.min(3,'El nombre debe tener al menos 3 carácteres.')
		.required('El nombre es obligatorio.'),
	code: yup
		.string()
		.min(3,'El código debe tener al menos 3 carácteres.'),
	giveChartAccountId: yup
		.string()
		.min(0,'El plan de cuentas es obligatorio.'),
	receiveChartAccountId: yup
		.string()
		.min(0,'El plan de cuentas es obligatorio.'),
}
