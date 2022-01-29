import React from "react";
import {CircularProgress, TextField} from "@mui/material";
import {Autocomplete as MuiAutocomplete} from '@mui/material';
import throttle from 'lodash/throttle';
import styles from "../../../../styles/components/Form.module.scss";

type formType = {
	item: any,
	idx: number,
	formik: any
}

interface MainTextMatchedSubstrings {
	offset: number;
	length: number;
}
interface StructuredFormatting {
	main_text: string;
	secondary_text: string;
	main_text_matched_substrings: readonly MainTextMatchedSubstrings[];
}
interface PlaceType {
	description: string;
	structured_formatting: StructuredFormatting;
}

const LOADING = 'Cargando...';
const NO_RESULTS = 'No hay coincidencias';
const NO_INPUT = 'Escriba...';

const Autocomplete = ({formik, item, idx}:formType) => {
	const [value, setValue] = React.useState(null);
	const [open, setOpen] = React.useState(false);
	const [options, setOptions] = React.useState([] as any);
	const [loadingText, setLoadingText] = React.useState(NO_INPUT);
	const loading = open;

	const getData = React.useMemo(() => throttle(
		async (value) => {
			//console.log(':::Service query:', value);
			setLoadingText(LOADING);
			const queryBody = {
				text: value
			}
			const request
				= await fetch(`${process.env.NEXT_PUBLIC_PANAMA_HOST}/search/${item.index}`,
				{
					method: "POST",
					credentials: 'include',
					body: JSON.stringify(queryBody),
					headers: {
						'Content-Type': 'application/json',
						'accept': 'application/json'
					}
				});
			const response = await request.json();
			const opt = response.data;
			//console.log(':::Service respons from: ',value,'is', opt);
			if(opt.length === 0) setLoadingText(NO_RESULTS);
			setOptions(opt);
		},500),[]);

	React.useEffect(() => {
		//console.log('useEffect value changed: ',formik.values[item.key]);
		let active = true;

		if(formik.values[item.key].length > 0) {
			//console.log(':::Executing getData on value: ',formik.values[item.key]);
			getData(formik.values[item.key]);
		} else {
			setLoadingText(NO_INPUT);
			setOptions([]);
			//console.log(':::Not executed getData on value: ',formik.values[item.key]);
		}

		if (!loading) {
			//console.log('Loading false with options: ',options);
			return undefined;
		}
		return () => {
			active = false;
		};
	}, [loading, formik.values[item.key]]);

	React.useEffect(() => {
		if (!open) {
			setOptions([]);
		}
	}, [open]);

	return (
		<MuiAutocomplete
			id={`autocomplete-${idx}`}
			open={open}
			autoComplete
			autoSelect
			onOpen={() => {
				setOpen(true);
			}}
			onClose={() => {
				setOpen(false);
			}}
			onChange={(event: any, newValue: any) => {
				setOptions([]);
				event.target.name = item.key;
				event.target.value = newValue.id;
				//console.log('Autocomplete change: newValue', newValue, event.target);
				formik.handleChange(event);
			}}
			isOptionEqualToValue={(option:any, value:any) => option.name === value.name}
			getOptionLabel={(option:any) => {
				//console.log('Option label:', option)
				return option.name;
			}}
			renderOption={(props, option:any) => {
				return (
					<li {...props} key={option.id}>
						{option.name}
					</li>
				);
			}}
			options={options}
			loading={loading}
			loadingText={loadingText}
			//inputValue={formik.values[item.key]}
			filterOptions={(x:any) => x}
			renderInput={(params:any) => (
				<TextField
					{...params}
					size={'small'}
					fullWidth
					label={item.label}
					id={item.key}
					name={item.key}
					onChange={(e) => {
						//console.log('Event of change in textField', e);
						formik.handleChange(e);
					}}
					InputProps={{
						...params.InputProps,
						endAdornment: (
							<React.Fragment>
								{loading ? <CircularProgress color="inherit" size={20} /> : null}
								{params.InputProps.endAdornment}
							</React.Fragment>
						),
					}}
					required={item.required}
					className={styles.formItem}
				/>
			)}
		/>
	);
}

export default Autocomplete;
