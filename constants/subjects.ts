//Configuration
import {CONFIGURATION, CONTABLE} from "../components/layouts/DrawerConfiguration";

export const USER = 'USER';
export const ROLE = 'ROLE';
export const CURRENCY = 'CURRENCY';
export const LAYOUT = 'LAYOUT';
export const COMPANY = 'COMPANY';

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

export const getDrawerSubjectsConfiguration = () => {
	const res = {} as any;
	SUBJECTS.forEach((item) => {
		res[item] = false;
	})
	return res;
}

export const subjectToDrawerConfiguration = {
	"user": USER,
	"role": ROLE,
	"currency": CURRENCY,
	"layout": LAYOUT,
	"company": COMPANY
} as any
