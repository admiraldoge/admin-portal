import MenuItem from "@mui/material/MenuItem";
import {FormControl, FormHelperText, InputLabel, Select} from "@mui/material";
import styles from "../../../../styles/components/Form.module.scss";
import React from "react";

type formType = {
	item: any,
	idx: number,
	formik: any
}

const SelectField = ({formik, item, idx}:formType) => {
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

export default SelectField;
