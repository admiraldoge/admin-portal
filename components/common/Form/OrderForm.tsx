import Grid from "@mui/material/Grid";
import React, {Component, FC, useEffect, useState} from "react";
import * as yup from "yup";
import {useFormik} from "formik";
import Button from "@mui/material/Button";
import styles from '../../../styles/components/OrderForm.module.scss';
import _ from 'lodash';
import {useAppDispatch, useAppSelector} from "../../../redux/hooks";
import {addElementToSet, setItem, setLayout} from "../../../redux/actions";
import Typography from "@mui/material/Typography";
import StringField from "./components/StringField";
import LongStringField from "./components/LongStringField";
import SelectField from "./components/SelectField";
import OneSelectionOfMultipleField from "./components/OneSelectionOfMultipleField";
import DateField from "./components/DateField";
import BooleanField from "./components/BooleanField";
import Autocomplete from "./components/Autocomplete";
import EditableTable from "../EditableTable";
import {GridEditRowsModel, GridRenderCellParams} from "@mui/x-data-grid";
import Search from '../Search';
import {RootState} from "../../../redux/store";
import {updateObjectInArray, updateObjectInArrayById} from "../../../utils/state";
import {TextField} from "@mui/material";
import SearchManual from "../SearchManual";

type props = {
	method?: 'POST' | 'PATCH' | 'DELETE',
	config: any[],
	validationSchema: {},
	resourcePath: string,
	initialData?: any,
	title?: string,
	submitButtonLabel?: string,
	onSubmit?: any,
	onSubmitMessage?: string,
	onSubmitErrorMessage?: string,
	layout?: any,
	layoutProps?: any
}

function ItemCell(params: GridRenderCellParams<number>, item:any) {
	if(params.value === 0) return <p></p>;
	//console.log('::: params', params, 'with item: ',item);
	return <p>{item[params.value] ? item[params.value].name : params.value}</p>;
}

function ItemEditInputCell(props: GridRenderCellParams<number>) {
	//console.log(':::Item, edit iput cell props: ', props);
	const { id, value, api, field } = props;
	const dispatch = useAppDispatch();
	const handleChange = async (event:any, value:any, entity:any) => {
		//console.log(':::: Render item handle change event to ', value, entity);
		if(entity) {
			dispatch(setItem({[entity.id]: entity}))
			dispatch(addElementToSet({setName: 'ORDER_FORM_ITEMS', value: {id: id, item: entity}}))
		}
		api.setEditCellValue({ id, field, value: value }, event);
	};

	return (
		<Search index={'item'} value={value} setValue={handleChange}/>
	);
}

function renderItemEditInputCell(params:any) {
	return <ItemEditInputCell {...params} />;
}

function TestItemCell(params: GridRenderCellParams<number>, item:any) {
	return <p>{params.value}</p>;
}

function TestItemEditInputCell(props: GridRenderCellParams<number>) {
	//console.log(':::Item, edit iput cell props: ', props);
	const { id, value, api, field } = props;
	const dispatch = useAppDispatch();
	const form = useAppSelector((state: RootState) => state.form);
	const handleChange = async (event:any, value:any, entity:any) => {
		//console.log(':::: Render item handle change event to ', value, entity);
		if(entity) {
			dispatch(setItem({[entity.id]: entity}));
			dispatch(addElementToSet({setName: 'ORDER_ITEMS', value: {id, item: entity}}));
		}
		api.setEditCellValue({ id, field, value: value }, event);
	};

	return (
		<SearchManual index={'item'} value={value} setValue={handleChange}/>
	);
}

function testRenderItemEditInputCell(params:any) {
	return <TestItemEditInputCell {...params} />;
}

const Form: FC<props> = (
	{
		method = 'PATCH',
		config,
		validationSchema,
		resourcePath,
		initialData = {},
		onSubmit = () => {},
		onSubmitMessage= 'Se ha ejecutado exitosamente.',
		onSubmitErrorMessage = 'Ha ocurrido un error.',
		title = 'Formulario',
		submitButtonLabel = 'Enviar',
		layout,
		layoutProps
	}
) => {
	const yupValidationSchema = yup.object(validationSchema);
	const dispatch = useAppDispatch();
	const item = useAppSelector((state: RootState) => state.item);
	const [snackbarState, setSnackbarState] = useState({open: false, message: ''});
	const emptyOrderItem = { id: 0, itemId: 0, quantity: 0, price: 0, total: 0, item: {}, itemName: ""};
	const [tableValues, setTableValues] = useState([emptyOrderItem] as any);
	const [tableFinalValues, setTableFinalValues] = useState([emptyOrderItem] as any);
	const [tableRowModel, setTableRowModel] = useState({} as any);

	const getInitialValues = () => {
		const res = {} as any;
		config.forEach((item:{key: string, type:string}, idx:number) => {
			//console.log('Proccesing: ',item.key, ' of type',item.type);
			switch(item.type) {
				case 'array':
					res[item.key] = initialData[item.key] ? initialData[item.key] : [emptyOrderItem, emptyOrderItem];
					break;
				default:
					res[item.key] = _.isEmpty(initialData) ? '' : (initialData[item.key] ? initialData[item.key] : undefined);
			}
		})
		return res;
	}

	const processValues = (values:any) => {
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

	const formik = useFormik({
		initialValues: getInitialValues(),
		validationSchema: yupValidationSchema,
		onSubmit: async (values) => {
			const cleanValues = processValues(values);
			console.log('Submit: ',cleanValues);
			console.log('Submit table values: ',tableValues);
			/*
			try {
				const request
					= await fetch(`${process.env.NEXT_PUBLIC_PANAMA_HOST}${resourcePath}`,
					{
						method: method,
						credentials: 'include',
						body: JSON.stringify(cleanValues),
						headers: {
							'Content-Type': 'application/json',
							'accept': 'application/json'
						}
					});
				const response = await request.json();
				if(response.statusCode === 201 || response.statusCode === 200) {
					onSubmit();
					dispatch(setLayout({snackbar: {open: true, type: 'success', message: onSubmitMessage}}));
				} else {
					dispatch(setLayout({snackbar: {open: true, type: 'error', message: onSubmitErrorMessage}}));
				}
			} catch (error) {
				dispatch(setLayout({snackbar: {open: true, type: 'error', message: onSubmitErrorMessage}}));
			}

			 */
		},
	});

	const formItems = config.map((item:any, idx:number) => {
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

	const FormLayout = () => {
		if(layout) {
			//console.log(':::Form: ', layout)
			return layout({...layoutProps, children: formItems})
		}
		return formItems;
	}

	function getTotal(params:any) {
		return params.row.quantity * params.row.price;
	}

	const itemTableColumns = [
		{
			field: 'itemId',
			headerName: 'Item',
			renderCell: (params:any) => ItemCell(params, item),
			renderEditCell: renderItemEditInputCell,
			width: 250,
			editable: true,
			type: 'string'
		},
		{
			field: 'itemName',
			headerName: 'Nombre de item',
			renderCell: (params:any) => TestItemCell(params, item),
			renderEditCell: testRenderItemEditInputCell,
			width: 250,
			editable: true,
			type: 'string'
		},
		{
			field: 'quantity',
			headerName: 'Cantidad',
			editable: true,
			width: 100,
			type: 'number',
		},
		{
			field: 'unitOfMeasure',
			headerName: 'Unidad',
			editable: true,
			width: 100,
			type: 'string',
		},
		{
			field: 'price',
			headerName: 'Precio',
			editable: true,
			width: 100,
			type: 'number',
		},
		{
			field: 'total',
			headerName: 'Total',
			editable: false,
			width: 100,
			type: 'number',
			valueGetter: getTotal,
		},
	];

	function onRowCreate(callback:any){
		setTableValues([...tableValues, {...emptyOrderItem, id: tableValues[tableValues.length - 1].id +1}] )
	}

	function onRowEdit(row:any, callback:any){

	}

	function onRowDelete(row:any){

	}

	const handleEditRowsModelChange = React.useCallback((model: GridEditRowsModel) => {
		//console.log('::::: Table model updated: ', model);
		//console.log('::::: Table values: ', tableValues);
		let newTableValues = [];
		for(const [key,value] of Object.entries(model)) {
			const newData = {id: parseInt(key)} as any;
			for(const [key,field] of Object.entries(value)) {
				newData[key] = field.value;
			}
			//console.log('::: NewData', newData);
			newTableValues = updateObjectInArrayById(tableValues, newData);
			dispatch(addElementToSet({setName: 'ORDER_ITEMS', value: {id: parseInt(key), ...newData}}))
			//console.log('::: New table values', newTableValues);
			setTableValues(newTableValues);
		}
		//setTableValues(updateObjectInArrayById(tableFinalValues, model))
		setTableRowModel(model);
	}, [tableValues]);

	return (
		<Grid container direction={"column"} justifyContent={"stretch"} alignContent={"center"}
		      style={{backgroundColor: "transparent"}}
		>
			<Typography variant="h6">{title}</Typography>
			<form onSubmit={formik.handleSubmit} className={styles.form}>
				{FormLayout()}
				<Grid container direction={'row'} justifyContent={'center'} className={styles.spreadsheet}>
					<EditableTable
						data={tableValues}
						columns={itemTableColumns}
						rowModel={tableRowModel}
						onRowCreate={onRowCreate}
						onRowDelete={onRowDelete}
						onRowUpdate={handleEditRowsModelChange}
					/>
				</Grid>
				<Button color="primary" variant="contained" fullWidth type="submit" className={styles.submitBtn}>
					{submitButtonLabel}
				</Button>
			</form>
		</Grid>
	)
}

export default Form
