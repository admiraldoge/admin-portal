import { createTheme } from '@mui/material/styles';
import { green, purple } from '@mui/material/colors';

const lightTheme = createTheme({
	palette: {
		primary: {
			main: '#3f51b5',
		},
		secondary: {
			main: '#f50057',
		},
	},
});

const darkTheme = createTheme({
	palette: {
		mode: 'dark',
	},
});

lightTheme.typography.h3 = {
	fontSize: '1.2rem',
	'@media (min-width:600px)': {
		fontSize: '1.5rem',
	},
	[lightTheme.breakpoints.up('md')]: {
		fontSize: '2.4rem',
	},
};

export {lightTheme, darkTheme};
