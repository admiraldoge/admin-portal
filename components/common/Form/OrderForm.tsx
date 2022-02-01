import Grid from "@mui/material/Grid";
import React from "react";
import * as yup from "yup";
import {useFormik} from "formik";
import Button from "@mui/material/Button";
import styles from '../../../styles/components/OrderForm.module.scss';
import _ from 'lodash';
import Typography from "@mui/material/Typography";
import {FormItems, processValues} from "../../../utils/form";
import OrderItemsTable from "./FormTables/OrderItemsTable";

type props = {
	method?: 'POST' | 'PATCH' | 'DELETE',
	config: any[],
	validationSchema: {},
	resourcePath: string,
	initialData?: any,
	title?: string,
	submitButtonLabel?: string,
	onSubmit?: any,
	onSubmitMessage?: string,
	onSubmitErrorMessage?: string,
	layout?: any,
	layoutProps?: any
}

const FormLayout = (layout:any, layoutProps:any, formik: any, config:any, children:any) => {
	if(layout) {
		//console.log(':::Form: ', layout)
		return layout({...layoutProps, children: children})
	}
	return children;
}

const getInitialValues = (config:any, initialData:any) => {
	const res = {} as any;
	config.forEach((item:{key: string, type:string}, idx:number) => {
		//console.log('Proccesing: ',item.key, ' of type',item.type);
		switch(item.type) {
			case 'array':
				res[item.key] = initialData[item.key] ? initialData[item.key] : [];
				break;
			default:
				res[item.key] = _.isEmpty(initialData) ? '' : (initialData[item.key] ? initialData[item.key] : undefined);
		}
	})
	return res;
}

const Form = (
	{
		method = 'PATCH',
		config,
		validationSchema,
		resourcePath,
		initialData = {},
		onSubmit = () => {},
		onSubmitMessage= 'Se ha ejecutado exitosamente.',
		onSubmitErrorMessage = 'Ha ocurrido un error.',
		title = 'Formulario',
		submitButtonLabel = 'Enviar',
		layout,
		layoutProps
	}:props
) => {
	const yupValidationSchema = yup.object(validationSchema);

	const formik = useFormik({
		initialValues: getInitialValues(config, initialData),
		validationSchema: yupValidationSchema,
		onSubmit: async (values) => {
			const cleanValues = processValues(config, values);
			console.log('Submit: ',cleanValues);
			/*
			try {
				const request
					= await fetch(`${process.env.NEXT_PUBLIC_PANAMA_HOST}${resourcePath}`,
					{
						method: method,
						credentials: 'include',
						body: JSON.stringify(cleanValues),
						headers: {
							'Content-Type': 'application/json',
							'accept': 'application/json'
						}
					});
				const response = await request.json();
				if(response.statusCode === 201 || response.statusCode === 200) {
					onSubmit();
					dispatch(setLayout({snackbar: {open: true, type: 'success', message: onSubmitMessage}}));
				} else {
					dispatch(setLayout({snackbar: {open: true, type: 'error', message: onSubmitErrorMessage}}));
				}
			} catch (error) {
				dispatch(setLayout({snackbar: {open: true, type: 'error', message: onSubmitErrorMessage}}));
			}

			 */
		},
	});

	return (
		<Grid container direction={"column"} justifyContent={"stretch"} alignContent={"center"}
		      style={{backgroundColor: "transparent"}}
		>
			<Typography variant="h6">{title}</Typography>
			<form onSubmit={formik.handleSubmit} className={styles.form}>
				{FormLayout(layout, layoutProps, formik, config, FormItems(formik, config))}
				<Grid container direction={'row'} justifyContent={'center'} className={styles.spreadsheet}>
					<OrderItemsTable/>
				</Grid>
				<Button color="primary" variant="contained" fullWidth type="submit" className={styles.submitBtn}>
					{submitButtonLabel}
				</Button>
			</form>
		</Grid>
	)
}

export default Form
