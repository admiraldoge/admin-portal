import type { NextPage } from 'next'
import React, {useEffect, useState} from 'react'
import styles from '../../../styles/pages/Role.module.scss';
import {useAppDispatch, useAppSelector} from "../../../redux/hooks";
import {useRouter} from "next/router";
import Table from "../../../components/common/Table";
import {ADMINISTRATION_ACTIVITY, ADMINISTRATION_ACTIVITY_TYPE} from "../../../constants/subjects";
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
} from "../../../configurations/forms/ActivityTypeFormConfiguration";
import {ACTIVITY_TYPE_LIST, CHART_ACCOUNT_LIST, TRANSACTION_TYPE_LIST} from "../../../constants/lists";
import {getList} from "../../../services/listService";

const ActivityType: NextPage = () => {
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
			Header: 'Nombre',
			accessor: 'name',
			width: 62,
			align: 'flex-start'
		}
	]

	function onRowCreate(callback:any){
		setCreateModalOpen(true);
		setReloadCallback(() => () => callback());
	}

	function onRowEdit(row:any, callback:any){
		setEditModalOpen(true);
		setEntityId(row.id);
	}

	function onRowDelete(row:any){
		dispatch(deleteRow(ADMINISTRATION_ACTIVITY_TYPE, row.id));
	}

	const getConfiguration = (initialConf:any) => {
		const conf = JSON.parse(JSON.stringify(initialConf));
		return conf;
	}


	return (
		<>
			<Grid className={styles.ctn}>
				<Grid item xs={12}>
					<Table
						subject={ADMINISTRATION_ACTIVITY_TYPE}
						columns={columns} defaultPageSize={25} pageQuery={getPage} serverData={true}
						globalFilterEnabled={true}
						onRowCreate={onRowCreate}
						onRowDelete={onRowDelete}
						onRowUpdate={onRowEdit}
					/>
					<Modal open={editModalOpen} setOpen={setEditModalOpen}>
						<ResourceContainer path={entityId ? `${ADMINISTRATION_ACTIVITY_TYPE.path}/${entityId}` : null} resourceName={'initialData'}>
							<Form
								config={getConfiguration(editConfiguration)}
								validationSchema={validationSchema}
								resourcePath={`${ADMINISTRATION_ACTIVITY_TYPE.path}/${entityId}`}
								onSubmit={() => {setEditModalOpen(false)}}
							/>
						</ResourceContainer>
					</Modal>
					<Modal open={createModalOpen} setOpen={setCreateModalOpen}>
						<Form
							method={'POST'}
							config={getConfiguration(createConfiguration)}
							validationSchema={validationSchema}
							resourcePath={`${ADMINISTRATION_ACTIVITY_TYPE.path}`}
							onSubmit={() => {setCreateModalOpen(false); reloadCallback();}}
						/>
					</Modal>
				</Grid>

			</Grid>
		</>
	)
}

export default ActivityType
