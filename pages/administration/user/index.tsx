import type { NextPage } from 'next'
import React, {useEffect, useState} from 'react'
import styles from '../../../styles/pages/Role.module.scss';
import {useAppDispatch} from "../../../redux/hooks";
import {useRouter} from "next/router";
import { useTable, usePagination } from 'react-table';
import Table from "../../../components/common/Table";
import {getRolePage} from "../../../services/roles";
import {ROLE, USER} from "../../../constants/subjects";
import Grid from "@mui/material/Grid";
import Checkbox from '@mui/material/Checkbox';
import RoleModal from "../../../components/common/configuration/RoleModal";
import ModeEditIcon from '@mui/icons-material/ModeEdit';
import {getUserPage} from "../../../services/users";

const User: NextPage = () => {
	const dispatch = useAppDispatch();
	const router = useRouter();
	const [subjectsModal, setSubjectsModal] = useState({
		open: false,
		data: {}
	});

	const columns = [
		{
			Header: 'ID',
			accessor: 'id',
			width: 10,
			centered: true
		},
		{
			Header: 'Usuario',
			accessor: 'username',
			width: 50,
		},
		{
			Header: 'Nombre',
			accessor: (row:any, index:any) => {
				return (
					<Grid container justifyContent={"center"}>
						{`${row.person.firstName} ${row.person.lastName}`}
					</Grid>
				);
			},
			width: 50,
		},
		{
			Header: 'Activo',
			accessor: (row:any, index:any) => {
				return (
					<Grid container justifyContent={"center"}>
						<Checkbox checked={row.isActive} />
					</Grid>
				);
			},
			disableSortBy: true,
			disableFilters: true,
			width: 10
		},
		{
			Header: 'Acciones',
			accessor: (row:any, index:any) => {
				return (
					<Grid container direction={"row"} justifyContent={"center"} alignItems={"center"}>
						<Grid item>
							<ModeEditIcon
								onClick={() => {
									setSubjectsModal({data: row, open: true});
								}}
								style={{cursor: "pointer"}}
							/>
						</Grid>
					</Grid>
				);
			},
			disableSortBy: true,
			disableFilters: true,
			width: 30
		}
	]

	return (
		<Grid className={styles.ctn}>
			<Grid item xs={12}>
				<Table
					columns={columns} defaultPageSize={10} pageQuery={getUserPage} entityName={USER} serverData={true}
					globalFilterEnabled={true}
				/>
			</Grid>

		</Grid>
	)
}

export default User
