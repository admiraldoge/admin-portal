import {FormControl, FormControlLabel, FormLabel, Radio, RadioGroup} from "@mui/material";
import styles from "../../../../styles/components/Form.module.scss";
import Grid from "@mui/material/Grid";
import React from "react";

type formType = {
	item: any,
	idx: number,
	formik: any
}

const OneSelectionOfMultipleField = ({formik, item, idx}:formType) => {
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

export default OneSelectionOfMultipleField;
