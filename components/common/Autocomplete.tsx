import React from "react";
import {CircularProgress, TextField} from "@mui/material";
import {Autocomplete as MuiAutocomplete} from '@mui/material';

const Autocomplete = () => {
	const [open, setOpen] = React.useState(false);
	const [options, setOptions] = React.useState([] as any);
	const loading = open && options.length === 0;

	React.useEffect(() => {
		let active = true;

		if (!loading) {
			return undefined;
		}

		return () => {
			active = false;
		};
	}, [loading]);

	React.useEffect(() => {
		if (!open) {
			setOptions([]);
		}
	}, [open]);

	return (
		<MuiAutocomplete
			id="asynchronous-demo"
			sx={{ width: 300 }}
			open={open}
			onOpen={() => {
				setOpen(true);
			}}
			onClose={() => {
				setOpen(false);
			}}
			isOptionEqualToValue={(option:any, value:any) => option.title === value.title}
			getOptionLabel={(option:any) => option.title}
			options={options}
			loading={loading}
			renderInput={(params:any) => (
				<TextField
					{...params}
					label="Asynchronous"
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

export default Autocomplete;
