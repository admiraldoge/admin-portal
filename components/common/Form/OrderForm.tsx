import Grid from "@mui/material/Grid";
import React, {Component, FC, useEffect, useState} from "react";
import * as yup from "yup";
import {useFormik} from "formik";
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";
import styles from '../../../styles/components/OrderForm.module.scss';
import _ from 'lodash';
import {useAppDispatch} from "../../../redux/hooks";
import {setLayout} from "../../../redux/actions";
import Typography from "@mui/material/Typography";
import MenuItem from "@mui/material/MenuItem";
import StringField from "./components/StringField";
import LongStringField from "./components/LongStringField";
import SelectField from "./components/SelectField";
import OneSelectionOfMultipleField from "./components/OneSelectionOfMultipleField";
import DateField from "./components/DateField";
import BooleanField from "./components/BooleanField";
import Autocomplete from "./components/Autocomplete";
import Table from "../Table";
import {getPage} from "../../../services/tableService";

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

const Form: FC<props> = (
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
	}
) => {
	const yupValidationSchema = yup.object(validationSchema);
	const dispatch = useAppDispatch();
	const [snackbarState, setSnackbarState] = useState({open: false, message: ''});

	const getInitialValues = () => {
		const res = {} as any;
		config.forEach((item:{key: string, type:string}, idx:number) => {
			//console.log('Proccesing: ',item.key, ' of type',item.type);
			switch(item.type) {
				case 'array':
					res[item.key] = initialData[item.key] ? initialData[item.key] : [{itemId: null, quantity: 0, unitOfMeasure: null, totalPrice: 0},{itemId: null, quantity: 0, unitOfMeasure: null, totalPrice: 0}]
					break;
				default:
					res[item.key] = _.isEmpty(initialData) ? '' : (initialData[item.key] ? initialData[item.key] : undefined);
			}
		})
		return res;
	}

	const processValues = (values:any) => {
		const res = {} as any;
		config.forEach((item:{key: string, type:string}, idx:number) => {
			//console.log('Proccesing: ',item.key,values[item.key], typeof values[item.key],values[item.key] === 'true');
			switch(item.type) {
				case 'boolean':
					if(typeof values[item.key] === 'boolean') {
						res[item.key] =  values[item.key];
					} else {
						res[item.key] = values[item.key] === 'true';
					}
					break;
				default:
					if(values[item.key] !== '') {
						res[item.key] = values[item.key];
					}
			}
		})
		return res;
	}

	const formik = useFormik({
		initialValues: getInitialValues(),
		validationSchema: yupValidationSchema,
		onSubmit: async (values) => {
			const cleanValues = processValues(values);
			console.log('Submit: ',cleanValues);
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
				console.log('Request', request, response);
				console.log('Response', response);
				if(response.statusCode === 201 || response.statusCode === 200) {
					onSubmit();
					dispatch(setLayout({snackbar: {open: true, type: 'success', message: onSubmitMessage}}));
				} else {
					dispatch(setLayout({snackbar: {open: true, type: 'error', message: onSubmitErrorMessage}}));
				}
			} catch (error) {
				dispatch(setLayout({snackbar: {open: true, type: 'error', message: onSubmitErrorMessage}}));
			}
		},
	});

	const formItems = config.map((item:any, idx:number) => {
		switch (item._template) {
			case 'string':
				return <StringField item={item} idx={idx} formik={formik}/>;
			case 'string_long':
				return <LongStringField item={item} idx={idx} formik={formik}/>;
			case 'boolean':
				return <BooleanField item={item} idx={idx} formik={formik}/>;
			case 'one_selection_radio':
				return <OneSelectionOfMultipleField item={item} idx={idx} formik={formik}/>;
			case 'select':
				return <SelectField item={item} idx={idx} formik={formik}/>;
			case 'date':
				return <DateField item={item} idx={idx} formik={formik}/>;
			case 'autocomplete':
				return <Autocomplete item={item} idx={idx} formik={formik}/>;
		}
	})

	const FormLayout = () => {
		if(layout) {
			//console.log(':::Form: ', layout)
			return layout({...layoutProps, children: formItems})
		}
		return formItems;
	}

	const itemTableColumns = [
		{
			Header: 'Item',
			accessor: (row:any, index:any) => {
				return (
					<Grid container direction={"row"} justifyContent={"center"} alignItems={"center"}>
						<TextField size={'small'} value={row.name}/>
					</Grid>
				);
			},
			disableSortBy: true,
			disableFilters: true,
			width: 10,
		},
		{
			Header: 'Unidad',
			accessor: (row:any, index:any) => {
				return (
					<Grid container direction={"row"} justifyContent={"center"} alignItems={"center"}>
						<TextField size={'small'} value={row.unitOfMeasureId}/>
					</Grid>
				);
			},
			width: 20,
			disableSortBy: true,
			disableFilters: true
		},
		{
			Header: 'Cantidad',
			accessor: (row:any, index:any) => {
				return (
					<Grid container direction={"row"} justifyContent={"center"} alignItems={"center"}>
						<TextField size={'small'} value={row.quantity}/>
					</Grid>
				);
			},
			type: 'number',
			width: 8,
			align: 'flex-start',
			disableSortBy: true,
			disableFilters: true
		}
	]

	function onRowCreate(callback:any){

	}

	function onRowEdit(row:any, callback:any){

	}

	function onRowDelete(row:any){

	}

	const testItem = {
		id: 10,
		name: 'Peluche de pug',
		quantity: '10',
		unitOfMeasureId: 12
	}

	return (
		<Grid container direction={"column"} justifyContent={"stretch"} alignContent={"center"}
		      style={{backgroundColor: "transparent"}}
		>
			<Typography variant="h6">{title}</Typography>
			<form onSubmit={formik.handleSubmit} className={styles.form}>
				{FormLayout()}
				<Grid container direction={'row'} justifyContent={'center'} className={styles.spreadsheet}>
					<Table
						data={formik.values['items']}
						serverData={false}
						columns={itemTableColumns}
						defaultPageSize={25} pageQuery={getPage}
						onRowCreate={onRowCreate}
						onRowDelete={onRowDelete}
						onRowUpdate={onRowEdit}
					/>
				</Grid>
				<Button color="primary" variant="contained" fullWidth type="submit" className={styles.submitBtn}>
					{submitButtonLabel}
				</Button>
			</form>
		</Grid>
	)
}

export default Form
