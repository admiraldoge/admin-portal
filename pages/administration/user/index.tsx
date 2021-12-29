import type { NextPage } from 'next'
import React, {useEffect, useState} from 'react'
import styles from '../../../styles/pages/Role.module.scss';
import {useAppDispatch, useAppSelector} from "../../../redux/hooks";
import {useRouter} from "next/router";
import { useTable, usePagination } from 'react-table';
import Table from "../../../components/common/Table";
import {getRolePage} from "../../../services/roles";
import {CURRENCY, ROLE, USER} from "../../../constants/subjects";
import Grid from "@mui/material/Grid";
import Checkbox from '@mui/material/Checkbox';
import RoleModal from "../../../components/common/configuration/RoleModal";
import ModeEditIcon from '@mui/icons-material/ModeEdit';
import {getUserPage} from "../../../services/users";
import {RootState} from "../../../redux/store";
import {getPage} from "../../../services/tableService";

const User: NextPage = () => {
	const dispatch = useAppDispatch();
	const router = useRouter();
	const me = useAppSelector((state: RootState) => state.me);

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
			Header: 'Nombres',
			accessor: 'firstName',
			width: 50,
		},
		{
			Header: 'Apellidos',
			accessor: 'lastName',
			width: 50,
		},
		{
			Header: 'Activo',
			accessor: (row:any, index:any) => {
				return (
					<Grid container justifyContent={"center"}>
						<Checkbox checked={row.appUserIsActive} />
					</Grid>
				);
			},
			disableSortBy: true,
			disableFilters: true,
			width: 10
		}
	]

	return (
		<Grid className={styles.ctn}>
			<Grid item xs={12}>
				{me.employerId && <Table
          subject={{path: '/app-users', name: USER}}
					columns={columns} defaultPageSize={10} pageQuery={getPage} serverData={true}
					queryParams={[{id: 'employerId', value: me.employerId}]}
					globalFilterEnabled={true}
				/>}
			</Grid>

		</Grid>
	)
}

export default User
