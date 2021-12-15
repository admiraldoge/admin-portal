import '../styles/globals.scss'
import 'regenerator-runtime/runtime'
import type { AppProps } from 'next/app'
import Header from "../components/layouts/Header";
import {Provider} from "react-redux";
import store from "../redux/store";
import Drawer from "../components/layouts/Drawer";
import { StyledEngineProvider } from '@mui/material/styles';
import Box from '@mui/material/Box';
import {CssBaseline} from "@mui/material";
import { ThemeProvider } from '@mui/material/styles';
import mainTheme from "../theme/mainTheme";
import Content from "../components/layouts/Content";
import {useRouter} from "next/router";
import {useAppDispatch} from "../redux/hooks";
import {useEffect} from "react";
import {getMe} from "../services/me";

function MyApp({ Component, pageProps }: AppProps) {
	const router = useRouter();
  return (
		<>
			<Provider store={store}>
				<StyledEngineProvider injectFirst>
					<ThemeProvider theme={mainTheme}>
						<Box sx={{ display: 'flex' }}>
							<CssBaseline />
							<Header/>
							<Drawer/>
							<Content>
								<Component {...pageProps} />
							</Content>
						</Box>
					</ThemeProvider>
				</StyledEngineProvider>
			</Provider>
		</>
  )
}

export default MyApp
