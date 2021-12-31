import type { NextPage } from 'next'
import React, {useEffect, useState} from 'react'
import styles from '../../../styles/pages/Role.module.scss';
import {useAppDispatch, useAppSelector} from "../../../redux/hooks";
import {useRouter} from "next/router";
import Table from "../../../components/common/Table";
import {CURRENCY, ROLE, USER} from "../../../constants/subjects";
import Grid from "@mui/material/Grid";
import Checkbox from '@mui/material/Checkbox';
import {RootState} from "../../../redux/store";
import {deleteRow, getPage} from "../../../services/tableService";
import Modal from "../../../components/common/Modal";
import Form from "../../../components/common/Form/Form";
import {editModalConfiguration, validationSchema} from "../../../configurations/forms/CurrencyFormConfiguration";
import {formTemplate} from "../../../configurations/forms/CompanyFormConfiguration";
import ResourceContainer from "../../../components/containers/ResourceContainer";
import {ADMINISTRATION_CURRENCY_PATH} from "../../../resources/paths";
const Currency: NextPage = () => {
	const dispatch = useAppDispatch();
	const router = useRouter();
	const me = useAppSelector((state: RootState) => state.me);
	const subject = {path: ADMINISTRATION_CURRENCY_PATH, name: CURRENCY};
	const [editModalOpen, setEditModalOpen] = useState(false);
	const [entityId, setEntityId] = useState(null);

	const columns = [
		{
			Header: 'ID',
			accessor: 'id',
			width: 8,
			centered: true,
			type: 'number'
		},
		{
			Header: 'Nombre',
			accessor: 'name',
			width: 62,
		},
		{
			Header: 'ISO',
			accessor: 'iso',
			width: 10,
		},
		{
			Header: 'Símbolo',
			accessor: 'symbol',
			width:10,
		}
	]

	function onRowDelete(row:any){
		dispatch(deleteRow(subject, row.id));
	}

	function onRowEdit(row:any){
		setEditModalOpen(true);
		setEntityId(row.id);
	}

	return (
		<Grid className={styles.ctn}>
			<Grid item xs={12}>
				<Table
					subject={subject}
					columns={columns} defaultPageSize={10} pageQuery={getPage} serverData={true}
					globalFilterEnabled={true}
					onRowDelete={onRowDelete}
					onRowUpdate={onRowEdit}
				/>
				<Modal open={editModalOpen} setOpen={setEditModalOpen}>
					<ResourceContainer path={entityId ? `${subject.path}/${entityId}` : null} resourceName={'initialData'}>
						<Form config={editModalConfiguration} validationSchema={validationSchema} resourcePath={`${subject.path}/${entityId}`}/>
					</ResourceContainer>
				</Modal>
			</Grid>

		</Grid>
	)
}

export default Currency
