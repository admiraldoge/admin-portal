import type { NextPage } from 'next'
import React, {useEffect, useState} from 'react'
import styles from '../../../styles/pages/Role.module.scss';
import {useAppDispatch, useAppSelector} from "../../../redux/hooks";
import Table from "../../../components/common/Table";
import {
	ADMINISTRATION_EXPENSE_TYPE,
} from "../../../constants/subjects";
import Grid from "@mui/material/Grid";
import {RootState} from "../../../redux/store";
import {deleteRow, getPage} from "../../../services/tableService";
import Modal from "../../../components/common/Modal";
import Form from "../../../components/common/Form/Form";
import ResourceContainer from "../../../components/containers/ResourceContainer";
import {
	ADMINISTRATION_EXPENSE_TYPE_PATH,
} from "../../../resources/paths";
import {
	createConfiguration,
	editConfiguration,
	validationSchema
} from "../../../configurations/forms/ExpenseTypeFormConfiguration";
import {getList} from "../../../services/listService";
import {CHART_ACCOUNT_LIST} from "../../../constants/lists";

const ExpenseType: NextPage = () => {
	const dispatch = useAppDispatch();
	const list = useAppSelector((state: RootState) => state.list);
	const subject = {path: ADMINISTRATION_EXPENSE_TYPE_PATH, name: ADMINISTRATION_EXPENSE_TYPE};
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
			Header: 'Nombre',
			accessor: 'name',
			width: 62,
			align: 'flex-start'
		}
	]

	function onRowCreate(callback:any){
		dispatch(getList(CHART_ACCOUNT_LIST));
		setCreateModalOpen(true);
		setReloadCallback(() => () => callback());
	}

	function onRowEdit(row:any, callback:any){
		dispatch(getList(CHART_ACCOUNT_LIST));
		setEditModalOpen(true);
		setEntityId(row.id);
		setReloadCallback(() => () => callback());
	}

	function onRowDelete(row:any, callback:any){
		dispatch(deleteRow(subject, row.id, callback));
	}

	const getConfiguration = (initialConf:any) => {
		const conf = JSON.parse(JSON.stringify(initialConf));
		conf[3].options = list[CHART_ACCOUNT_LIST.name].map((item:any,idx:number) => {
			return {
				label: item.name,
				value: item.id
			}
		})
		conf[4].options = list[CHART_ACCOUNT_LIST.name].map((item:any,idx:number) => {
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
					subject={subject}
					columns={columns} defaultPageSize={25} pageQuery={getPage} serverData={true}
					globalFilterEnabled={true}
					onRowCreate={onRowCreate}
					onRowDelete={onRowDelete}
					onRowUpdate={onRowEdit}
				/>
				<Modal open={editModalOpen} setOpen={setEditModalOpen}>
					<ResourceContainer path={entityId ? `${subject.path}/${entityId}` : null} resourceName={'initialData'}>
						<Form
							config={getConfiguration(editConfiguration)}
							validationSchema={validationSchema}
							resourcePath={`${subject.path}/${entityId}`}
							onSubmit={() => {setEditModalOpen(false); reloadCallback();}}
						/>
					</ResourceContainer>
				</Modal>
				<Modal open={createModalOpen} setOpen={setCreateModalOpen}>
					<Form
						method={'POST'}
						config={getConfiguration(createConfiguration)}
						validationSchema={validationSchema}
						resourcePath={`${subject.path}`}
						onSubmit={() => {setCreateModalOpen(false); reloadCallback();}}
					/>
				</Modal>
			</Grid>

		</Grid>
	)
}

export default ExpenseType
