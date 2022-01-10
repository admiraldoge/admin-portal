import TextField from "@mui/material/TextField";
import styles from "../../../../styles/components/Form.module.scss";
import React from "react";

type formType = {
	item: any,
	idx: number,
	formik: any
}

const StringField = ({formik, item, idx}:formType) => {
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
export default StringField;
