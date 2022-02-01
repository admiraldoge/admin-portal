import MenuItem from "@mui/material/MenuItem";
import {FormControl, Select} from "@mui/material";
import React from "react";

type formType = {
	value: any,
	setValue: any,
	options: any
}

const SelectText = ({value, setValue, options}:formType) => {
	const MenuOptions = options.map((option:any, index:number) => {
		//console.log('Rendering options : ',option);
		return <MenuItem key={`option-${index}-${option.value}`} value={option.value}>{option.label}</MenuItem>;
	})
	return (
		<FormControl
			fullWidth
		>
			<Select
				size={'small'}
				value={value}
				onChange={(a:any,b:any) => {
					//console.log('Select On change ',a,b);
					setValue(a, a.target.value, b.props);
				}}
			>
				{MenuOptions}
			</Select>
		</FormControl>
	)
}

export default SelectText;
