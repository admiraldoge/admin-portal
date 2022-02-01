import Grid from "@mui/material/Grid";
import React, {Component, FC, useEffect, useState} from "react";
import {useAppDispatch, useAppSelector} from "../../../../redux/hooks";
import {addElementToSet, removeElementFromSet, setItem, setLayout} from "../../../../redux/actions";
import EditableTable from "../../EditableTable";
import {GridApi, GridEditRowsModel, GridRenderCellParams} from "@mui/x-data-grid";
import {RootState} from "../../../../redux/store";
import SearchText from "../../SearchText";
import DeleteIcon from "@mui/icons-material/Delete";
import {INFINITE} from "../../../../constants/numbers";
import {ORDER_ITEMS_SET} from "../../../../constants/forms";

type props = {

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

function getTotal(params:any) {
	return params.row.quantity * params.row.price;
}

const OrderItemsTable = () => {
	const dispatch = useAppDispatch();
	const orderItems = useAppSelector((state: RootState) => state.form.sets[ORDER_ITEMS_SET]);
	const emptyOrderItem = { id: 0, itemId: 0, quantity: null, price: null, total: 0, item: {}, itemName: ""};
	const [orderItemId, setOrderItemId] = useState(INFINITE)
	const [tableRowModel, setTableRowModel] = useState({} as any);

	const itemTableColumns = React.useMemo(() => ([
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
	]),[]);

	function onRowCreate(callback:any){
		dispatch(addElementToSet({setName: ORDER_ITEMS_SET, value: {...emptyOrderItem, id: orderItemId} }));
		setOrderItemId(orderItemId+1);
	}

	function onRowEdit(row:any, callback:any){

	}

	function onRowDelete(row:any){

	}

	const handleEditRowsModelChange = React.useCallback((model: GridEditRowsModel) => {
		for(const [key,value] of Object.entries(model)) {
			const newData = {id: parseInt(key)} as any;
			for(const [key,field] of Object.entries(value)) {
				newData[key] = field.value;
			}
			dispatch(addElementToSet({setName: ORDER_ITEMS_SET, value: {id: parseInt(key), ...newData}}))
		}
		setTableRowModel(model);
	}, [orderItems]);

	return (
		<EditableTable
			data={orderItems}
			columns={itemTableColumns}
			rowModel={tableRowModel}
			onRowCreate={onRowCreate}
			onRowDelete={onRowDelete}
			onRowUpdate={handleEditRowsModelChange}
		/>
	)
}

export default OrderItemsTable;
