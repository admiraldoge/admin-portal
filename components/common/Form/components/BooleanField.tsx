import {FormControl, FormControlLabel, FormLabel} from "@mui/material";
import styles from "../../../../styles/components/Form.module.scss";
import Checkbox from "@mui/material/Checkbox";
import React from "react";
type formType = {
	item: any,
	idx: number,
	formik: any
}

const BooleanField = ({formik, item, idx}:formType) => {
	return (
		<FormControl component="fieldset" className={styles.formItem} key={`${idx}-${item.key}`}>
			<FormLabel component="legend">{item.label}</FormLabel>
			<FormControlLabel
				key={`${idx}-${item.key}`}
				id={item.key}
				name={item.key}
				control={
					<Checkbox
						checked={formik.values[item.key]}
						onChange={(e, checked) => {
							const se = e;
							// @ts-ignore
							se.target.value = se.target.checked ? 'true' : 'false';
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

export default BooleanField;
