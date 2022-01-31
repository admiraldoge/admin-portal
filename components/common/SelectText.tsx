import MenuItem from "@mui/material/MenuItem";
import {FormControl, Select} from "@mui/material";
import styles from "../../../../styles/components/Form.module.scss";
import React from "react";

type formType = {
	key: string,
	value: any,
	setValue: any,
	options: any
}

const SelectField = ({key, value, setValue, options}:formType) => {
	const MenuOptions = options.map((option:any, index:number) => {
		return <MenuItem key={`option-${index}-${option.value}`} value={option.value}>{option.label}</MenuItem>;
	})
	return (
		<FormControl
			key={key}
			fullWidth
			className={styles.formItem}
		>
			<Select
				size={'small'}
				value={value}
				onChange={setValue}
			>
				{MenuOptions}
			</Select>
		</FormControl>
	)
}

export default SelectField;
