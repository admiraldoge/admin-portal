import React, {FC, ReactChildren, ReactElement, useEffect, useState} from "react";
import {useAppDispatch, useAppSelector} from "../../redux/hooks";
import {useRouter} from "next/router";
import {RootState} from "../../redux/store";
import {cleanMe, setLayout} from "../../redux/actions";
import {getMe} from "../../services/me";
import _ from "lodash";
import {darkTheme, lightTheme} from "../../theme/themes";
import { ThemeProvider } from '@mui/material/styles';
import {CssBaseline} from "@mui/material";
import Snackbar from "../common/Snackbar";

type appProps = {
	children: any
}

const App = ({children}:appProps) => {
	const dispatch = useAppDispatch();
	const router = useRouter();
	const me = useAppSelector((state: RootState) => state.me);
	const layout = useAppSelector((state: RootState) => state.layout);

	useEffect(() => {
		dispatch(getMe());
		dispatch(setLayout({initialPath: router.pathname === '/' || router.pathname === '/login' ? layout.initialPath : router.pathname}));
	},[])

	useEffect(() => {
		//console.log('Loading pathname', router.pathname);
		//console.log('Changes in me detected', me);
		if(me.error && me.error.statusCode) {
			//console.log('Error detected, return to login');
			router.push("/login");
			dispatch(setLayout({initialPath: router.pathname === '/' || router.pathname === '/login' ? layout.initialPath : router.pathname}));
			dispatch(cleanMe());
		} else {
			if(!_.isEmpty(me.read)) {
				//console.log('Routing user to initial path',layout.initialPath );
				router.push(layout.initialPath);
			} else {
				//console.log('No hay ningun permiso de lectura para este usuario.', me);
				router.push('/login');
			}
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
			/>
		</ThemeProvider>
	);
}
export default App;
