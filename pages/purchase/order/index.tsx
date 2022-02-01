import type { NextPage } from 'next'
import React, {useEffect, useState} from 'react'
import styles from '../../../styles/pages/Role.module.scss';
import {useAppDispatch, useAppSelector} from "../../../redux/hooks";
import {useRouter} from "next/router";
import Table from "../../../components/common/Table";
import {
	ADMINISTRATION_ITEM,
	ADMINISTRATION_TAX_TYPE, PURCHASE_ORDER,
} from "../../../constants/subjects";
import Grid from "@mui/material/Grid";
import {RootState} from "../../../redux/store";
import {deleteRow, getPage} from "../../../services/tableService";
import Modal from "../../../components/common/Modal";
import Form from "../../../components/common/Form/Form";
import ResourceContainer from "../../../components/containers/ResourceContainer";
import {
	createConfiguration,
	editConfiguration,
	validationSchema
} from "../../../configurations/forms/OrderFormConfiguration";
import {
	ACTIVITY_LIST,
	EXPENSE_TYPE_LIST,
} from "../../../constants/lists";
import {getList} from "../../../services/listService";
import GridLayout from "../../../components/layouts/GridLayout";
import SpreadSheet from "../../../components/common/spreadsheet/SpreadSheet";
import OrderForm from "../../../components/common/Form/OrderForm";
const Item: NextPage = () => {
	const dispatch = useAppDispatch();
	const router = useRouter();
	const me = useAppSelector((state: RootState) => state.me);
	const list = useAppSelector((state: RootState) => state.list);
	const [editModalOpen, setEditModalOpen] = useState(false);
	const [createModalOpen, setCreateModalOpen] = useState(false);
	const [entityId, setEntityId] = useState(null);
	const [reloadCallback, setReloadCallback] = useState(() => function (){});

	const columns = [
		{
			Header: 'ID',
			accessor: 'id',
			width: 8,
			centered: true,
			type: 'number',
			align: 'center'
		},
		{
			Header: 'Código',
			accessor: 'code',
			width: 20,
			align: 'center'
		},
		{
			Header: 'Fecha',
			accessor: 'deadline',
			width: 62,
			align: 'flex-start'
		},
		{
			Header: 'Tipo',
			accessor: 'expense_type_id',
			width: 62,
			align: 'center'
		},
		{
			Header: 'Total',
			accessor: 'total',
			width: 62,
			align: 'center'
		}
	]

	function onRowCreate(callback:any){
		dispatch(getList(ACTIVITY_LIST));
		dispatch(getList(EXPENSE_TYPE_LIST));
		setCreateModalOpen(true);
		setReloadCallback(() => () => callback());
	}

	function onRowEdit(row:any, callback:any){
		dispatch(getList(ACTIVITY_LIST));
		dispatch(getList(EXPENSE_TYPE_LIST));
		setEditModalOpen(true);
		setEntityId(row.id);
		setReloadCallback(() => () => callback());
	}

	function onRowDelete(row:any, callback:any){
		dispatch(deleteRow(PURCHASE_ORDER, row.id, callback));
	}

	const getConfiguration = (initialConf:any) => {
		const conf = JSON.parse(JSON.stringify(initialConf));
		conf[0].options = list[ACTIVITY_LIST.name].map((item:any,idx:number) => {
			return {
				label: item.name,
				value: item.id
			}
		})
		conf[1].options = list[EXPENSE_TYPE_LIST.name].map((item:any,idx:number) => {
			return {
				label: item.name,
				value: item.id
			}
		})
		return conf;
	}

	return (
		<Grid className={styles.ctn}>
			<Grid item xs={12}>
				<Table
					subject={PURCHASE_ORDER}
					columns={columns} defaultPageSize={25} pageQuery={getPage} serverData={true}
					globalFilterEnabled={true}
					onRowCreate={onRowCreate}
					onRowDelete={onRowDelete}
					onRowUpdate={onRowEdit}
				/>
				<Modal open={createModalOpen} setOpen={setCreateModalOpen} width={1000}>
					<OrderForm
						method={'POST'}
						config={getConfiguration(createConfiguration)}
						validationSchema={validationSchema}
						resourcePath={`${PURCHASE_ORDER.path}`}
						onSubmit={() => {setCreateModalOpen(false); reloadCallback();}}
						layout={GridLayout}
						layoutProps={{columns: 2}}
					/>
				</Modal>
				<Modal open={editModalOpen} setOpen={setEditModalOpen}>
					<ResourceContainer path={entityId ? `${PURCHASE_ORDER.path}/${entityId}` : null} resourceName={'initialData'}>
						<Form
							config={getConfiguration(editConfiguration)}
							validationSchema={validationSchema}
							resourcePath={`${PURCHASE_ORDER.path}/${entityId}`}
							onSubmit={() => {setEditModalOpen(false); reloadCallback();}}
						/>
					</ResourceContainer>
				</Modal>
			</Grid>

		</Grid>
	)
}

export default Item
