import Grid from "@mui/material/Grid";
import {FC, useEffect} from "react";
import * as yup from "yup";
import {useFormik} from "formik";
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";

type props = {
	config: any[],
	validationSchema: {},
	resourcePath: string
}

const Form: FC<props> = ({config, validationSchema, resourcePath}) => {
	const yupValidationSchema = yup.object(validationSchema);

	const getInitialValues = () => {
		const res = {} as any;
		config.forEach((item:any, idx:number) => {
			res[item.key] = "";
		})
		return res;
	}

	const formik = useFormik({
		initialValues: getInitialValues(),
		validationSchema: yupValidationSchema,
		onSubmit: async (values) => {
			console.log('Submit: ',values);
			const request
				= await fetch(`${process.env.NEXT_PUBLIC_PANAMA_HOST}${resourcePath}`,
				{
					method: "PATCH",
					credentials: 'include',
					body: JSON.stringify(values),
					headers: {
						'Content-Type': 'application/json',
						'accept':  'application/json'
					}
				});
			const response = await request.json();
		},
	});

	const StringField = (item:any, idx:number) => {
		return (
			<TextField
				fullWidth
				key={`${idx}-${item.key}`}
				id={item.key}
				name={item.key}
				label={item.label}
				value={formik.values[item.key]}
				onChange={formik.handleChange}
				placeholder={item.placeholder}
				error={formik.touched[item.key] && Boolean(formik.errors[item.key])}
				helperText={formik.touched[item.key] && formik.errors[item.key]}
			/>
		)
	}

	const formItems = config.map((item:any, idx:number) => {
		switch (item._template) {
			case 'string':
				return StringField(item, idx);
		}
	})

	return (
		<Grid container direction={"row"} justifyContent={"center"} alignContent={"center"}>
			<form onSubmit={formik.handleSubmit}>
				{formItems}
				<Button color="primary" variant="contained" fullWidth type="submit">
					Guardar
				</Button>
			</form>
		</Grid>
	)
}

export default Form
