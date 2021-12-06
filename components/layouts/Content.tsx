import * as React from 'react';
import { styled, useTheme, Theme, CSSObject } from '@mui/material/styles';
import Box from '@mui/material/Box';
import {FC, useEffect} from "react";
import {useRouter} from "next/router";
import {useAppDispatch} from "../../redux/hooks";
import {getMe} from "../../services/me";

const DrawerHeader = styled('div')(({ theme }) => ({
	display: 'flex',
	alignItems: 'center',
	justifyContent: 'flex-end',
	padding: theme.spacing(0, 1),
	// necessary for content to be below app bar
	...theme.mixins.toolbar,
}));


const Content:FC = ({children}) => {
	const theme = useTheme();
	const [open, setOpen] = React.useState(false);
	const router = useRouter();
	const showContent = router.pathname !== "/login";

	const dispatch = useAppDispatch();

	useEffect(() => {
		dispatch(getMe());
	},[])

	const handleDrawerOpen = () => {
		setOpen(true);
	};

	const handleDrawerClose = () => {
		setOpen(false);
	};

	if(!showContent) return <>{children}</>;

	return (
		<Box sx={{ display: 'flex' }}>
			<Box component="main" sx={{ flexGrow: 1, p: 3 }}>
				<DrawerHeader />
				{children}
			</Box>
		</Box>
	);
}
export default Content
