import type { NextPage } from 'next'
import React, {useEffect, useState} from 'react'
import styles from '../../../styles/pages/Role.module.scss';
import {useAppDispatch} from "../../../redux/hooks";
import {useRouter} from "next/router";
import Table from "../../../components/common/Table";
import {ADMINISTRATION_ROLE, ROLE} from "../../../constants/subjects";
import Grid from "@mui/material/Grid";
import RoleModal from "../../../components/common/configuration/RoleModal";
import {deleteRow, getPage} from "../../../services/tableService";
import {DataGrid, GridApi} from "@mui/x-data-grid";
import {removeElementFromSet} from "../../../redux/actions";
import {ORDER_ITEMS_SET} from "../../../constants/forms";
import DeleteIcon from "@mui/icons-material/Delete";
import ServerTable from "../../../components/common/ServerTable";
import IconButton from "@mui/material/IconButton";

const Role: NextPage = () => {
	const dispatch = useAppDispatch();
	const router = useRouter();
	const [subjectsModal, setSubjectsModal] = useState({
		open: false,
		data: {}
	});
	const [reloadCallback, setReloadCallback] = useState(() => function (){});
	const [entityId, setEntityId] = useState(null);

	const itemTableColumns = React.useMemo(() => ([
		{
			field: 'name',
			headerName: 'Nombre de item',
			width: 250,
			type: 'string',
			sortable: true,
			filterable: true,
		},
		{
			field: 'userCount',
			headerName: '#Usuarios',
			width: 150,
			type: 'number',
		},
		{
			field: "delete",
			width: 75,
			sortable: false,
			disableColumnMenu: true,
			renderHeader: () => {
				return (
					<IconButton
						onClick={() => {
							console.log('Delete selected rows!');
						}}
					>
						<DeleteIcon style={{color: 'black'}}/>
					</IconButton>
				);
			}
		}
	]),[]);

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
				<ServerTable subject={ADMINISTRATION_ROLE} columns={itemTableColumns}/>
			</Grid>
			<RoleModal state={subjectsModal} setState={setSubjectsModal}/>
		</Grid>
	)
}

export default Role
