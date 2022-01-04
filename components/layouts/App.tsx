import React, {FC, ReactChildren, ReactElement, useEffect, useState} from "react";
import {useAppDispatch, useAppSelector} from "../../redux/hooks";
import {useRouter} from "next/router";
import {RootState} from "../../redux/store";
import {cleanMe, setLayout} from "../../redux/actions";
import {getMe} from "../../services/me";
import _, {initial} from "lodash";
import {darkTheme, lightTheme} from "../../theme/themes";
import { ThemeProvider } from '@mui/material/styles';
import {CssBaseline, useMediaQuery} from "@mui/material";
import Snackbar from "../common/Snackbar";

type appProps = {
	children: any
}

const App = ({children}:appProps) => {
	const dispatch = useAppDispatch();
	const router = useRouter();
	const me = useAppSelector((state: RootState) => state.me);
	const layout = useAppSelector((state: RootState) => state.layout);
	const isMobile = useMediaQuery('(max-width:600px)');

	useEffect(() => {
		if(isMobile) dispatch(setLayout({drawerExpanded: false}));
		dispatch(getMe());
		dispatch(setLayout({initialPath: router.pathname === '/' || router.pathname === '/login' ? layout.initialPath : router.pathname}));
	},[])

	useEffect(() => {
		console.log('Changes in me detected', me);
		if(me.error && me.error.statusCode) {
			//console.log('Error detected, return to login');
			if(me.error.statusCode === 401) {
				dispatch(setLayout({snackbar: {open: true, type: 'error', message: 'Su sesión a terminado, vuelva a ingresar.'}}));
			} else {
				alert('Strange error');
			}
			router.push("/login");
			dispatch(setLayout({initialPath: router.pathname === '/' || router.pathname === '/login' ? layout.initialPath : router.pathname}));
			dispatch(cleanMe());
		} else {
			if(_.isEmpty(me.read) && !(router.pathname === '/' || router.pathname === '/login')) {
				const newInitialPath = router.pathname === '/' || router.pathname === '/login' ? layout.initialPath : router.pathname;
				console.log('Me, has not loaded yet, so pushing to index, while saving initial path as', newInitialPath);
				dispatch(setLayout({initialPath: newInitialPath}));
				router.push('/');
			} else {
				console.log('No error, nor permits');
				if(router.pathname === '/login') {
					router.push('/');
				}
			}
			/*
			if(_.isEmpty(me.read)) {
				//console.log('No hay ningun permiso de lectura para este usuario.', me);
				if(router.pathname !== '/login') {
					dispatch(setLayout({snackbar: {open: true, type: 'error', message: 'Su sesión a terminado, vuelva a ingresar.'}}));
				}
				router.push('/login');
			} else {
				//console.log('Routing user to initial path',layout.initialPath );
				router.push(layout.initialPath);
			}
			 */
		}
	},[me])

	return (
		<ThemeProvider theme={layout.theme === 'light' ? lightTheme : darkTheme}>
			<CssBaseline />
			{children}
			<Snackbar
				open={layout.snackbar.open}
				setOpen={(value:boolean) => dispatch(setLayout({snackbar: {...layout.snackbar, open: value}}))}
				message={layout.snackbar.message}
				type={layout.snackbar.type}
			/>
		</ThemeProvider>
	);
}
export default App;
