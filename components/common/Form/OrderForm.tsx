import Grid from "@mui/material/Grid";
import React, {Component, FC, useEffect, useState} from "react";
import * as yup from "yup";
import {useFormik} from "formik";
import Button from "@mui/material/Button";
import styles from '../../../styles/components/OrderForm.module.scss';
import _ from 'lodash';
import {useAppDispatch, useAppSelector} from "../../../redux/hooks";
import {addElementToSet, removeElementFromSet, setItem, setLayout} from "../../../redux/actions";
import Typography from "@mui/material/Typography";
import StringField from "./components/StringField";
import LongStringField from "./components/LongStringField";
import SelectField from "./components/SelectField";
import OneSelectionOfMultipleField from "./components/OneSelectionOfMultipleField";
import DateField from "./components/DateField";
import BooleanField from "./components/BooleanField";
import Autocomplete from "./components/Autocomplete";
import EditableTable from "../EditableTable";
import {GridApi, GridCellValue, GridEditRowsModel, GridRenderCellParams} from "@mui/x-data-grid";
import Search from '../Search';
import {RootState} from "../../../redux/store";
import {updateObjectInArray, updateObjectInArrayById} from "../../../utils/state";
import {TextField} from "@mui/material";
import SearchText from "../SearchText";
import Checkbox from "@mui/material/Checkbox";
import {onSetIsActive} from "../../../services/tableService";
import ModeEditIcon from "@mui/icons-material/ModeEdit";
import DeleteIcon from "@mui/icons-material/Delete";
import {INFINITE} from "../../../constants/numbers";
import {ORDER_ITEMS_SET} from "../../../constants/forms";

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

function TestItemCell(params: GridRenderCellParams<number>) {
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
			dispatch(addElementToSet({setName: ORDER_ITEMS_SET, value: {id, item: entity}}));
		}
		api.setEditCellValue({ id, field, value: value }, event);
	};

	return (
		<SearchText index={'item'} value={value} setValue={handleChange}/>
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
	const orderItems = useAppSelector((state: RootState) => state.form.sets[ORDER_ITEMS_SET]);
	const emptyOrderItem = { id: 0, itemId: 0, quantity: null, price: null, total: 0, item: {}, itemName: ""};
	const [orderItemId, setOrderItemId] = useState(INFINITE)
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
			field: 'itemName',
			headerName: 'Nombre de item',
			renderCell: TestItemCell,
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
		{
			field: 'actions',
			headerName: 'Acciones',
			editable: false,
			sortable: false,
			filterable: false,
			hideable: false,
			width: 100,
			renderCell: (params:any) => {
				const onClick = (e:any) => {
					e.stopPropagation(); // don't select this row after clicking

					const api: GridApi = params.api;
					console.log('Data grid api : ', api.getAllColumns(), params, params.id);
					dispatch(removeElementFromSet({setName: ORDER_ITEMS_SET, value: {id: params.id}}));
				};

				return (
					<Grid container direction={"row"} justifyContent={"center"} alignItems={"center"}>
						<DeleteIcon
							onClick={onClick}
							style={{cursor: "pointer"}}
						/>
					</Grid>
				);
			}
		}
	];

	function onRowCreate(callback:any){
		dispatch(addElementToSet({setName: ORDER_ITEMS_SET, value: {...emptyOrderItem, id: orderItemId} }));
		setOrderItemId(orderItemId+1);
	}

	function onRowEdit(row:any, callback:any){

	}

	function onRowDelete(row:any){

	}

	const handleEditRowsModelChange = React.useCallback((model: GridEditRowsModel) => {
		//console.log('::::: Table model updated: ', model);
		//console.log('::::: Table values: ', tableValues);
		//let newTableValues = [];
		for(const [key,value] of Object.entries(model)) {
			const newData = {id: parseInt(key)} as any;
			for(const [key,field] of Object.entries(value)) {
				newData[key] = field.value;
			}
			//console.log('::: NewData', newData);
			//newTableValues = updateObjectInArrayById(tableValues, newData);
			dispatch(addElementToSet({setName: ORDER_ITEMS_SET, value: {id: parseInt(key), ...newData}}))
			//console.log('::: New table values', newTableValues);
			//setTableValues(newTableValues);
		}
		//setTableValues(updateObjectInArrayById(tableFinalValues, model))
		setTableRowModel(model);
	}, [orderItems]);

	return (
		<Grid container direction={"column"} justifyContent={"stretch"} alignContent={"center"}
		      style={{backgroundColor: "transparent"}}
		>
			<Typography variant="h6">{title}</Typography>
			<form onSubmit={formik.handleSubmit} className={styles.form}>
				{FormLayout()}
				<Grid container direction={'row'} justifyContent={'center'} className={styles.spreadsheet}>
					<EditableTable
						data={orderItems}
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
