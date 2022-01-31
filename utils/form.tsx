import StringField from "../components/common/Form/components/StringField";
import LongStringField from "../components/common/Form/components/LongStringField";
import BooleanField from "../components/common/Form/components/BooleanField";
import OneSelectionOfMultipleField from "../components/common/Form/components/OneSelectionOfMultipleField";
import SelectField from "../components/common/Form/components/SelectField";
import DateField from "../components/common/Form/components/DateField";
import Autocomplete from "../components/common/Form/components/Autocomplete";
import React from "react";

export const FormItems = (formik:any, config:any) => {
	const res = config.map((item:any, idx:number) => {
		switch (item._template) {
			case 'string':
				return <StringField item={item} idx={idx} formik={formik}/>;
			case 'string_long':
				return <LongStringField item={item} idx={idx} formik={formik}/>;
			case 'boolean':
				return <BooleanField item={item} idx={idx} formik={formik}/>;
			case 'one_selection_radio':
				return <OneSelectionOfMultipleField item={item} idx={idx} formik={formik}/>;
			case 'select':
				return <SelectField item={item} idx={idx} formik={formik}/>;
			case 'date':
				return <DateField item={item} idx={idx} formik={formik}/>;
			case 'autocomplete':
				return <Autocomplete item={item} idx={idx} formik={formik}/>;
		}
	})
	return res;
}

export const processValues = (config:any, values:any) => {
	const res = {} as any;
	config.forEach((item:{key: string, type:string}, idx:number) => {
		//console.log('Proccesing: ',item.key,values[item.key], typeof values[item.key],values[item.key] === 'true');
		switch(item.type) {
			case 'boolean':
				if(typeof values[item.key] === 'boolean') {
					res[item.key] =  values[item.key];
				} else {
					res[item.key] = values[item.key] === 'true';
				}
				break;
			default:
				if(values[item.key] !== '') {
					res[item.key] = values[item.key];
				}
		}
	})
	return res;
}
