import * as yup from "yup";

export const formTemplate = [
	{
		_template: 'string',
		key: 'businessName',
		label: 'Nombre del negocio',
		type: 'text',
		placeholder: 'abc...'
	},
	{
		_template: 'string',
		key: 'commercialName',
		label: 'Nombre comercial',
		type: 'text',
		placeholder: 'abc...'
	},
	{
		_template: 'string',
		key: 'website',
		label: 'Website',
		type: 'text',
		placeholder: 'abc...',
	},
	{
		_template: 'string',
		key: 'shortName',
		label: 'Nombre abreviado',
		type: 'text',
		placeholder: 'abc...',
	},
	{
		_template: 'multipleRadio',
		key: 'isNatural',
		label: 'Es natural',
		options: [{label: 'Es persona natural', value: true}, {label: 'Es persona jurídica', value: false}],
		type: 'text',
		placeholder: 'abc...'
	}
]

export const validationSchema = {
	businessName: yup
		.string()
		.min(5,'Inserta un nombre válido!')
		.required('El nombre es obligatorio.'),
	website: yup
		.string()
		.min(8, 'Inserta una web válida!')
		.required('La web es obligatoria.'),
}
