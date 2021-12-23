import SettingsIcon from '@mui/icons-material/Settings';
import EmojiPeopleIcon from '@mui/icons-material/EmojiPeople';
import ApartmentIcon from '@mui/icons-material/Apartment';
import ExtensionIcon from '@mui/icons-material/Extension';
import React from "react";

export const CONFIGURATION = 'CONFIGURATION';
export const CONTABLE = 'CONTABLE';

export const showDrawerCategory = {
	[CONFIGURATION]: false,
	[CONTABLE]: false
} as any


export const conf = [
	{
		_template: 'module',
		path: 'configuration',
		icon: <SettingsIcon/>,
		subject: "CONFIGURATION",
		expanded: false,
		children: [
			{
				_template: 'subject',
				path: '/configuration/role',
				icon: <EmojiPeopleIcon/>,
				subject: "CONFIGURATION_ROLE",
				loc: 'Roles',
				selected: false
			},
			{
				_template: 'subject',
				path: '/configuration/company',
				icon: <ApartmentIcon/>,
				subject: "CONFIGURATION_COMPANY",
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
