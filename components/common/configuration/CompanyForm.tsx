import styles from '../../../styles/components/CompanyForm.module.scss';
import Grid from "@mui/material/Grid";
import {FC, useEffect} from "react";
import {useFormik} from "formik";
import * as yup from 'yup';
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";

type props = {
	company?: {
		name: string,
		web: string,
		desc: string
	}
}

const CompanyForm: FC<props> = ({company}) => {

	useEffect(() => {
		console.log('Company loaded', company);
	},[company])

	const validationSchema = yup.object({
		email: yup
			.string()
			.email('Enter a valid email')
			.required('Email is required'),
		password: yup
			.string()
			.min(8, 'Password should be of minimum 8 characters length')
			.required('Password is required'),
	});

	const formik = useFormik({
		initialValues: {
			email: 'foobar@example.com',
			password: 'foobar',
		},
		validationSchema: validationSchema,
		onSubmit: (values) => {
			alert(JSON.stringify(values, null, 2));
		},
	});

	return (
		<Grid container direction={"row"} justifyContent={"center"} alignContent={"center"} className={styles.ctn}>
			<form onSubmit={formik.handleSubmit}>
				<TextField
					fullWidth
					id="email"
					name="email"
					label="Name"
					value={formik.values.email}
					onChange={formik.handleChange}
					error={formik.touched.email && Boolean(formik.errors.email)}
					helperText={formik.touched.email && formik.errors.email}
				/>
				<TextField
					fullWidth
					id="password"
					name="password"
					label="Password"
					type="password"
					value={formik.values.password}
					onChange={formik.handleChange}
					error={formik.touched.password && Boolean(formik.errors.password)}
					helperText={formik.touched.password && formik.errors.password}
				/>
				<Button color="primary" variant="contained" fullWidth type="submit">
					Submit
				</Button>
			</form>
		</Grid>
	)
}

export default CompanyForm
