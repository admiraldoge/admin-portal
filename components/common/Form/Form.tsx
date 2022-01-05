import Grid from "@mui/material/Grid";
import React, {FC, useEffect, useState} from "react";
import * as yup from "yup";
import {useFormik} from "formik";
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";
import styles from '../../../styles/components/Form.module.scss';
import _ from 'lodash';
import {updateObjectInArray} from "../../../utils/table";
import Checkbox from "@mui/material/Checkbox";
import {
	FormControl,
	FormControlLabel,
	FormLabel,
	RadioGroup,
	Radio,
	InputLabel,
	Select,
	FormHelperText
} from "@mui/material";
import Snackbar from "../Snackbar";
import {useAppDispatch} from "../../../redux/hooks";
import {setLayout} from "../../../redux/actions";
import Typography from "@mui/material/Typography";
import MenuItem from "@mui/material/MenuItem";

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
	onSubmitErrorMessage?: string
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
		submitButtonLabel = 'Enviar'
	}
) => {
	const yupValidationSchema = yup.object(validationSchema);
	const dispatch = useAppDispatch();
	const [snackbarState, setSnackbarState] = useState({open: false, message: ''});

	const getInitialValues = () => {
		const res = {} as any;
		config.forEach((item:{key: string, type:string}, idx:number) => {
			switch(item.type) {
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
					res[item.key] = values[item.key] === 'true';
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

	const StringField = (item:any, idx:number) => {
		return (
			<TextField
				type={item.type ? item.type : 'text'}
				size={'small'}
				fullWidth
				key={`${idx}-${item.key}`}
				id={item.key}
				name={item.key}
				label={item.label}
				value={formik.values[item.key]}
				onChange={formik.handleChange}
				placeholder={item.placeholder}
				required={item.required}
				error={formik.touched[item.key] && Boolean(formik.errors[item.key])}
				helperText={formik.touched[item.key] && formik.errors[item.key]}
				className={styles.formItem}
				style={{display: item.hidden ? 'none' : undefined}}
			/>
		)
	}

	const LongStringField = (item:any, idx:number) => {
		return (
			<TextField
				size={'small'}
				fullWidth
				multiline
				rows={4}
				key={`${idx}-${item.key}`}
				id={item.key}
				name={item.key}
				label={item.label}
				value={formik.values[item.key]}
				onChange={formik.handleChange}
				placeholder={item.placeholder}
				error={formik.touched[item.key] && Boolean(formik.errors[item.key])}
				helperText={formik.touched[item.key] && formik.errors[item.key]}
				className={styles.formItem}
				style={{display: item.hidden ? 'none' : undefined}}
			/>
		)
	}

	const BooleanField = (item:any, idx:number) => {
		return (
			<FormControl component="fieldset" className={styles.formItem} key={`${idx}-${item.key}`}>
				<FormLabel component="legend">{item.label}</FormLabel>
				<FormControlLabel
					key={`${idx}-${item.key}`}
					name={item.key}
					control={
						<Checkbox
							checked={formik.values[item.key]}
							onChange={(e, checked) => {
								const se = e;
								// @ts-ignore
								se.target.value = se.target.checked;
								//console.log('Checked',e.target.checked,e.target.value,checked);
								formik.handleChange(se)
							}}
							style={{padding: '9px 9px 9px 0'}}
						/>
					}
					label={formik.values[item.key] ? item.options[0] : item.options[1]}
					className={styles.formItem}
					style={{display: item.hidden ? 'none' : undefined, margin: 0}}
				/>
			</FormControl>
		)
	}

	const OneSelectionOfMultipleField = (item:any, idx:number) => {
		const FormControlLabels = item.options.map((option:any, i:number) => {
			return (
				<FormControlLabel
					key={`${i}-${item.key}`}
					value={option.value}
					control={<Radio style={{padding: '0px 9px 0 0', margin: '0 0 0 0'}}/>}
					label={option.label}
					className={styles.formItem}
					style={{padding: '9px 9px 0 0', margin: '0 0 0 0'}}
				/>
			);
		})
		return (
			<Grid key={`one_selection_radio-${idx}`}>
				<FormControl component="fieldset" className={styles.formItem} key={`${idx}-${item.key}`}>
					<FormLabel component="legend" required={item.required}>{item.label}</FormLabel>
					<RadioGroup row aria-label="options" name={item.key} onChange={formik.handleChange}>
						{FormControlLabels}
					</RadioGroup>
				</FormControl>
			</Grid>
		)
	}

	const SelectField = (item:any, idx:number) => {
		const options = item.options.map((option:any) => {
			return <MenuItem key={`option-${idx}-${option.value}`} value={option.value}>{option.label}</MenuItem>;
		})
		return (
			<FormControl
				fullWidth key={`select-${idx}`}
				className={styles.formItem}
				required={item.required}
			>
				<InputLabel id="demo-simple-select-label">{item.label}</InputLabel>
				<Select
					size={'small'}
					name={item.key}
					value={formik.values[item.key]}
					label={item.label}
					onChange={formik.handleChange}
					error={Boolean(formik.errors[item.key])}
				>
					{options}
				</Select>
				{Boolean(formik.errors[item.key])
				&& <FormHelperText error={true}>{formik.errors[item.key]}</FormHelperText>
				}
			</FormControl>
		)
	}

	const formItems = config.map((item:any, idx:number) => {
		switch (item._template) {
			case 'string':
				return StringField(item, idx);
			case 'string_long':
				return LongStringField(item, idx);
			case 'boolean':
				return BooleanField(item, idx);
			case 'one_selection_radio':
				return OneSelectionOfMultipleField(item, idx);
			case 'select':
				return SelectField(item, idx);
		}
	})

	return (
		<Grid container direction={"row"} justifyContent={"stretch"} alignContent={"center"}
		      style={{backgroundColor: "transparent"}}
		>
			<Typography variant="h6">{title}</Typography>
			<form onSubmit={formik.handleSubmit} className={styles.form}>
				{formItems}
				<Button color="primary" variant="contained" fullWidth type="submit" className={styles.submitBtn}>
					{submitButtonLabel}
				</Button>
			</form>
		</Grid>
	)
}

export default Form
