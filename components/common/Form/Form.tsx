import Grid from "@mui/material/Grid";
import React, {FC, useEffect} from "react";
import * as yup from "yup";
import {useFormik} from "formik";
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";
import styles from '../../../styles/components/Form.module.scss';
import _ from 'lodash';
import {updateObjectInArray} from "../../../utils/table";
import Checkbox from "@mui/material/Checkbox";
import {FormControl, FormControlLabel, FormLabel, RadioGroup, Radio} from "@mui/material";

type props = {
	config: any[],
	validationSchema: {},
	resourcePath: string,
	initialData?: any
}

const Form: FC<props> = ({config, validationSchema, resourcePath, initialData={}}) => {
	const yupValidationSchema = yup.object(validationSchema);

	const getInitialValues = () => {
		const res = {} as any;
		config.forEach((item:{key: string}, idx:number) => {
			res[item.key] = _.isEmpty(initialData) ? '' : initialData[item.key];
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
				className={styles.formItem}
				style={{display: item.hidden ? 'none' : undefined}}
			/>
		)
	}

	const LongStringField = (item:any, idx:number) => {
		return (
			<TextField
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
			<FormControlLabel
				key={`${idx}-${item.key}`}
				control={
					<Checkbox
						checked={formik.values[item.key]}
						onChange={formik.handleChange}
					/>
				}
				label="Disabled"
				className={styles.formItem}
				style={{display: item.hidden ? 'none' : undefined}}
			/>
		)
	}

	const OneSelectionOfMultipleField = (item:any, idx:number) => {
		const FormControlLabels = item.options.map((option:any, i:number) => {
			return (
				<FormControlLabel
					key={`${i}-${item.key}`}
					value={option.value}
					control={<Radio />}
					label={option.label} />
			);
		})
		return (
			<FormControl component="fieldset" className={styles.formItem} key={`${idx}-${item.key}`}>
				<FormLabel component="legend">{item.label}</FormLabel>
				<RadioGroup row aria-label="options" name={item.key} onChange={formik.handleChange}>
					{FormControlLabels}
				</RadioGroup>
			</FormControl>
		)
	}

	const formItems = config.map((item:any, idx:number) => {
		switch (item._template) {
			case 'string':
				return StringField(item, idx);
			case 'longString':
				return LongStringField(item, idx);
			case 'boolean':
				return BooleanField(item, idx);
			case 'multipleRadio':
				return OneSelectionOfMultipleField(item, idx);
		}
	})

	return (
		<Grid container direction={"row"} justifyContent={"stretch"} alignContent={"center"}
		      style={{backgroundColor: "transparent"}}
		>
			<form onSubmit={formik.handleSubmit} className={styles.form}>
				{formItems}
				<Button color="primary" variant="contained" fullWidth type="submit" className={styles.submitBtn}>
					Guardar
				</Button>
			</form>
		</Grid>
	)
}

export default Form
