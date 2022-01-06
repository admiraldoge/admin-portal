import type { NextPage } from 'next'
import React, {useEffect, useState} from 'react'
import styles from '../../../styles/pages/Role.module.scss';
import {useAppDispatch} from "../../../redux/hooks";
import {useRouter} from "next/router";
import Table from "../../../components/common/Table";
import {ADMINISTRATION_ROLE} from "../../../constants/subjects";
import Grid from "@mui/material/Grid";
import RoleModal from "../../../components/common/configuration/RoleModal";
import {deleteRow, getPage} from "../../../services/tableService";

const Role: NextPage = () => {
	const dispatch = useAppDispatch();
	const router = useRouter();
	const [subjectsModal, setSubjectsModal] = useState({
		open: false,
		data: {}
	});
	const [reloadCallback, setReloadCallback] = useState(() => function (){});
	const [entityId, setEntityId] = useState(null);

	const columns = [
		{
			Header: 'ID',
			accessor: 'id',
			width: 10,
			align: 'center'
		},
		{
			Header: 'Nombre',
			accessor: 'loc',
			width: 50,
		}
	]

	function onRowCreate(callback:any){

		setReloadCallback(() => () => callback());
	}

	function onRowEdit(row:any, callback:any){
		setSubjectsModal({open: true, data: {}});
		setEntityId(row.id);
	}

	function onRowDelete(row:any){
		dispatch(deleteRow(ADMINISTRATION_ROLE, row.id));
	}

	return (
		<Grid className={styles.ctn}>
			<Grid item xs={12}>
				<Table
					subject={ADMINISTRATION_ROLE}
					columns={columns} defaultPageSize={10} pageQuery={getPage} serverData={true}
					globalFilterEnabled={true}
					onRowCreate={onRowCreate}
					onRowDelete={onRowDelete}
					onRowUpdate={onRowEdit}
				/>
			</Grid>
			<RoleModal state={subjectsModal} setState={setSubjectsModal}/>
		</Grid>
	)
}

export default Role
