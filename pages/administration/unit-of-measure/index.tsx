import type { NextPage } from 'next'
import React, {useEffect, useState} from 'react'
import styles from '../../../styles/pages/Role.module.scss';
import {useAppDispatch, useAppSelector} from "../../../redux/hooks";
import Table from "../../../components/common/Table";
import {ADMINISTRATION_UNIT_OF_MEASURE,} from "../../../constants/subjects";
import Grid from "@mui/material/Grid";
import {RootState} from "../../../redux/store";
import {deleteRow, getPage} from "../../../services/tableService";
import Modal from "../../../components/common/Modal";
import Form from "../../../components/common/Form/Form";
import ResourceContainer from "../../../components/containers/ResourceContainer";
import {ADMINISTRATION_UNIT_OF_MEASURE_PATH,} from "../../../resources/paths";
import {
	createConfiguration,
	editConfiguration,
	validationSchema
} from "../../../configurations/forms/UnitOfMeasureFormConfiguration";
import {getListOfChartAccounts} from "../../../services/chartAccounts";
const UnitOfMeasure: NextPage = () => {
	const dispatch = useAppDispatch();
	const list = useAppSelector((state: RootState) => state.list);
	const subject = {path: ADMINISTRATION_UNIT_OF_MEASURE_PATH, name: ADMINISTRATION_UNIT_OF_MEASURE};
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
		dispatch(getListOfChartAccounts());
		setCreateModalOpen(true);
		setReloadCallback(() => () => callback());
	}

	function onRowEdit(row:any, callback:any){
		setEditModalOpen(true);
		setEntityId(row.id);
		setReloadCallback(() => () => callback());
	}

	function onRowDelete(row:any, callback:any){
		dispatch(deleteRow(subject, row.id, callback));
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
							config={editConfiguration}
							validationSchema={validationSchema}
							resourcePath={`${subject.path}/${entityId}`}
							onSubmit={() => {setEditModalOpen(false); reloadCallback();}}
						/>
					</ResourceContainer>
				</Modal>
				<Modal open={createModalOpen} setOpen={setCreateModalOpen}>
					<Form
						method={'POST'}
						config={createConfiguration}
						validationSchema={validationSchema}
						resourcePath={`${subject.path}`}
						onSubmit={() => {setCreateModalOpen(false); reloadCallback();}}
					/>
				</Modal>
			</Grid>

		</Grid>
	)
}

export default UnitOfMeasure
