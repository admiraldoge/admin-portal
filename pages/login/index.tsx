import type { NextPage } from 'next'
import Head from 'next/head'
import Image from 'next/image'
import styles from '../../styles/pages/Login.module.scss';
import Box from "@mui/material/Box";
import TextField from '@mui/material/TextField';
import Paper from '@mui/material/Paper';
import Grid from '@mui/material/Grid';
import {Typography} from "@mui/material";
import Button from '@mui/material/Button';
import {margin} from "@mui/system";
import {useFormik} from "formik";
import * as yup from 'yup';
import {useAppDispatch} from "../../redux/hooks";
import {auth} from "../../services/auth";
import {useRouter} from "next/router";
import Meta from "../../components/layouts/Meta";

const Login: NextPage = () => {
	const dispatch = useAppDispatch();
	const router = useRouter();

	const validationSchema = yup.object({
		username: yup
			.string()
			.email('Ingresa un correo válido.')
			.required('El correo es requerido.'),
		password: yup
			.string()
			.min(6, 'El password debe contener al menos 6 caracteres.')
			.required('La contraseña es requerida.'),
	});

	const formik = useFormik({
		initialValues: {
			username: '',
			password: '',
		},
		validationSchema: validationSchema,
		onSubmit: async (values) => {
			await dispatch(auth(values));
		},
	});

	return (
		<>
			<div className={styles.ctn}>
				<Grid container direction={"row"} justifyContent={"center"} alignContent={"center"} className={styles.loginCtn}>
					<Grid item xs={11} sm={6} lg={4}>
						<form onSubmit={formik.handleSubmit}>
							<Grid container direction={"row"} justifyContent={"center"} className={styles.loginForm}>
								<Grid item xs={10}>
									<Grid
										container
										direction={"column"}
										justifyContent={"center"}
										alignContent={"center"}
									>
										<Grid container direction={"row"} style={{marginBottom: "1.5em"}}>
											<Grid item xs={12}>
												<Typography variant="h3">Ingreso</Typography>
											</Grid>
										</Grid>
										<Grid container direction={"row"} style={{marginBottom: "1em"}}>
											<Grid item xs={12}>
												<TextField
													label="Correo"
													style={{marginLeft: "0", marginRight: "0"}}
													fullWidth
													id="username"
													autoComplete={"username"}
													name="username"
													value={formik.values.username}
													onChange={formik.handleChange}
													error={formik.touched.username && Boolean(formik.errors.username)}
													helperText={formik.touched.username && formik.errors.username}
												/>
											</Grid>
										</Grid>
										<Grid container direction={"row"} style={{marginBottom: "2em"}}>
											<Grid item xs={12}>
												<TextField
													label="Contraseña"
													type="password"
													autoComplete="current-password"
													style={{marginLeft: "0", marginRight: "0"}}
													fullWidth
													id="password"
													name="password"
													value={formik.values.password}
													onChange={formik.handleChange}
													error={formik.touched.password && Boolean(formik.errors.password)}
													helperText={formik.touched.password && formik.errors.password}
												/>
											</Grid>
										</Grid>
										<Grid container direction={"row"}>
											<Grid item xs={12}>
												<Button variant={"contained"} fullWidth  type="submit">Ingresar</Button>
											</Grid>
										</Grid>
									</Grid>
								</Grid>
							</Grid>
						</form>
					</Grid>
				</Grid>
			</div>
		</>
	)
}

export default Login
