import React from "react";
import SettingsIcon from '@mui/icons-material/Settings';
import EmojiPeopleIcon from '@mui/icons-material/EmojiPeople';
import ApartmentIcon from '@mui/icons-material/Apartment';
import ExtensionIcon from '@mui/icons-material/Extension';
import PeopleIcon from '@mui/icons-material/People';
import AttachMoneyIcon from '@mui/icons-material/AttachMoney';
import SupervisorAccountIcon from '@mui/icons-material/SupervisorAccount';
import AccountTreeIcon from '@mui/icons-material/AccountTree';
import BrushIcon from '@mui/icons-material/Brush';
import LocalAtmIcon from '@mui/icons-material/LocalAtm';
import CategoryIcon from '@mui/icons-material/Category';
import PaidIcon from '@mui/icons-material/Paid';
import PublicIcon from '@mui/icons-material/Public';
import LocationCityIcon from '@mui/icons-material/LocationCity';
import SquareFootIcon from '@mui/icons-material/SquareFoot';
import IsoIcon from '@mui/icons-material/Iso';
import ExposureIcon from '@mui/icons-material/Exposure';
import AccountBalanceIcon from '@mui/icons-material/AccountBalance';
import InventoryIcon from '@mui/icons-material/Inventory';
import {
	ADMINISTRATION_BRAND,
	ADMINISTRATION_CATEGORY, ADMINISTRATION_CITY,
	ADMINISTRATION_COUNTRY,
	ADMINISTRATION_EXPENSE_TYPE,
	ADMINISTRATION_INCOME_TYPE,
	ADMINISTRATION_PAYMENT_METHOD,
	ADMINISTRATION_TAX_TYPE,
	ADMINISTRATION_TRANSACTION_TYPE,
	ADMINISTRATION_UNIT_OF_MEASURE
} from "../../constants/subjects";

export const CONFIGURATION = 'CONFIGURATION';
export const CONTABLE = 'CONTABLE';

export const showDrawerCategory = {
	[CONFIGURATION]: false,
	[CONTABLE]: false
} as any


export const conf = [
	{
		_template: 'module',
		path: 'administration',
		icon: <SupervisorAccountIcon/>,
		subject: "ADMINISTRATION",
		loc: 'Administración',
		expanded: false,
		children: [
			{
				_template: 'subject',
				path: '/administration/item',
				icon: <InventoryIcon/>,
				subject: "ADMINISTRATION_ITEM",
				loc: 'Items',
				selected: false
			},
			{
				_template: 'subject',
				path: '/administration/user',
				icon: <PeopleIcon/>,
				subject: "ADMINISTRATION_USER",
				loc: 'Usuarios',
				selected: false
			},
			{
				_template: 'subject',
				path: '/administration/chart-account',
				icon: <AccountTreeIcon/>,
				subject: "ADMINISTRATION_CHART_ACCOUNT",
				loc: 'Plan de cuentas',
				selected: false
			},
			{
				_template: 'subject',
				path: '/administration/currency',
				icon: <AttachMoneyIcon/>,
				subject: "ADMINISTRATION_CURRENCY",
				loc: 'Monedas',
				selected: false
			},
			{
				_template: 'subject',
				path: '/administration/brand',
				icon: <BrushIcon/>,
				subject: ADMINISTRATION_BRAND,
				loc: 'Marcas',
				selected: false
			},
			{
				_template: 'subject',
				path: '/administration/category',
				icon: <CategoryIcon/>,
				subject: ADMINISTRATION_CATEGORY,
				loc: 'Categorías',
				selected: false
			},
			{
				_template: 'subject',
				path: '/administration/transaction-type',
				icon: <LocalAtmIcon/>,
				subject: ADMINISTRATION_TRANSACTION_TYPE,
				loc: 'Tipos de transacción',
				selected: false
			},
			{
				_template: 'subject',
				path: '/administration/tax-type',
				icon: <AccountBalanceIcon/>,
				subject: ADMINISTRATION_TAX_TYPE,
				loc: 'Tipos de impuesto',
				selected: false
			},
			{
				_template: 'subject',
				path: '/administration/income-type',
				icon: <IsoIcon/>,
				subject: ADMINISTRATION_INCOME_TYPE,
				loc: 'Tipos de ingreso',
				selected: false
			},
			{
				_template: 'subject',
				path: '/administration/expense-type',
				icon: <ExposureIcon/>,
				subject: ADMINISTRATION_EXPENSE_TYPE,
				loc: 'Tipos de gasto',
				selected: false
			},
			{
				_template: 'subject',
				path: '/administration/payment-method',
				icon: <PaidIcon/>,
				subject: ADMINISTRATION_PAYMENT_METHOD,
				loc: 'Modalidad de transacción',
				selected: false
			},
			{
				_template: 'subject',
				path: '/administration/unit-of-measure',
				icon: <SquareFootIcon/>,
				subject: ADMINISTRATION_UNIT_OF_MEASURE,
				loc: 'Unidades de medida',
				selected: false
			},
			{
				_template: 'subject',
				path: '/administration/country',
				icon: <PublicIcon/>,
				subject: ADMINISTRATION_COUNTRY,
				loc: 'Países',
				selected: false
			},
			{
				_template: 'subject',
				path: '/administration/city',
				icon: <LocationCityIcon/>,
				subject: ADMINISTRATION_CITY,
				loc: 'Ciudades',
				selected: false
			},
			{
				_template: 'subject',
				path: '/administration/role',
				icon: <EmojiPeopleIcon/>,
				subject: "ADMINISTRATION_ROLE",
				loc: 'Roles',
				selected: false
			},
		]
	},
	{
		_template: 'module',
		path: 'configuration',
		icon: <SettingsIcon/>,
		subject: "CONFIGURATION",
		loc: 'Configuración',
		expanded: false,
		children: [
			{
				_template: 'subject',
				path: '/configuration/company',
				icon: <ApartmentIcon/>,
				subject: "CONFIGURATION_LEGAL_PERSON",
				loc: 'Empresa',
				selected: false
			},
			{
				_template: 'title',
				loc: 'Otros',
				path: '/others',
				icon: <ExtensionIcon/>
			},
		]
	},
] as any
