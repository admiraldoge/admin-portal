import React from "react";
import {CircularProgress, TextField} from "@mui/material";
import {Autocomplete as MuiAutocomplete} from '@mui/material';
import throttle from 'lodash/throttle';
import styles from '../../styles/components/Search.module.scss';

type autocompleteProps = {
	index: string,
	value: any,
	setValue: any,
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

const SearchManual = ({index, value, setValue}:autocompleteProps) => {
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
				= await fetch(`${process.env.NEXT_PUBLIC_PANAMA_HOST}/search/${index}`,
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
		//console.log('useEffect value changed: ',value);
		let active = true;

		if(value.length > 0) {
			//console.log(':::Executing getData on value: ',value);
			getData(value);
		} else {
			setLoadingText(NO_INPUT);
			setOptions([]);
			//console.log(':::Not executed getData on value: ',value);
		}

		if (!loading) {
			//console.log('Loading false with options: ',options);
			return undefined;
		}
		return () => {
			active = false;
		};
	}, [loading, value]);

	React.useEffect(() => {
		if (!open) {
			setOptions([]);
		}
	}, [open]);

	return (
		<MuiAutocomplete
			id={`autocomplete-${value.id}`}
			className={styles.ctn}
			open={open}
			autoComplete
			autoSelect
			inputValue={value ? value : ''}
			onOpen={() => {
				setOpen(true);
			}}
			onClose={() => {
				setOpen(false);
			}}
			onChange={(event: any, newValue: any) => {
				setOptions([]);
				//event.target.name = item.key;
				//event.target.value = newValue;
				//console.log('Search change: newValue', newValue, event.target);
				//console.log(':::Search change value', event);
				setValue(event, newValue ? newValue.name : '' , newValue);
			}}
			isOptionEqualToValue={(option:any, value:any) => option.name === value.name}
			getOptionLabel={(option:any) => {
				//console.log('Option label:', option)
				return option.name;
			}}
			renderOption={(props, option:any) => {
				return (
					<li {...props} key={option.id}>
						{`${option.code} - ${option.name}`}
					</li>
				);
			}}
			options={options}
			loading={loading}
			loadingText={loadingText}
			//inputValue={value}
			filterOptions={(x:any) => x}
			renderInput={(params:any) => (
				<TextField
					{...params}
					size={'small'}
					fullWidth
					onChange={(e) => {
						setValue(e, e.target.value);
						console.log(':::Search TextField change value', e.target.value);
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
				/>
			)}
		/>
	);
}

export default SearchManual;
