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
import {theme} from "../theme/mainTheme";
import Content from "../components/layouts/Content";
import {useRouter} from "next/router";
import App from "../components/layouts/App";

function MyApp({ Component, pageProps }: AppProps) {
  return (
		<>
			<Provider store={store}>
				<StyledEngineProvider injectFirst>
					<ThemeProvider theme={theme}>
						<Box sx={{ display: 'flex' }}>
							<CssBaseline />
							<App>
								<Header/>
								<Drawer/>
								<Content>
									<Component {...pageProps} />
								</Content>
							</App>
						</Box>
					</ThemeProvider>
				</StyledEngineProvider>
			</Provider>
		</>
  )
}

export default MyApp
