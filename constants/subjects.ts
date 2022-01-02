//Configuration
import {CONFIGURATION, CONTABLE} from "../components/layouts/DrawerConfiguration";

export const USER = 'USER';
export const ROLE = 'ROLE';
export const CURRENCY = 'CURRENCY';
export const LAYOUT = 'LAYOUT';
export const COMPANY = 'COMPANY';
export const ADMINISTRATION_CHART_ACCOUNT = 'ADMINISTRATION_CHART_ACCOUNT';

export const subjectsCategory = {
	[USER]: CONFIGURATION,
	[ROLE]: CONFIGURATION,
	[CURRENCY]: CONFIGURATION,
	[LAYOUT]: CONFIGURATION,
} as any

export const subjectPaths = {
	[ROLE]: '/configuration/role'
}

export const SUBJECTS = [USER, ROLE, CURRENCY, LAYOUT, COMPANY];
